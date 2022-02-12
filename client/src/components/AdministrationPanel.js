import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import ExperimentResultContext from '../context/ExperimentResult/ExperimentResultContext';
import { PROXY } from '../App';

const AdministrationPanel = () => {
  const authContext = useContext(AuthContext);
  const experimentResultContext = useContext(ExperimentResultContext);
  const [ isLoading, setIsLoading ] = useState(true);

  const { experiment_names, getAllExperimentResults } = experimentResultContext;

  useEffect(() => {
    authContext.loadUser();
    getAllExperimentResults().then(() => {
      setIsLoading(false);
    });
  }, []);

  const download = (url, filename) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(console.error);
  }

  return (
    <div className="administration-panel">
      <h2>Panel administracyjny</h2>
      <div className="experiment-panel-list">
        <h3>Zarządzaj eksperymentami:</h3>
        <ul>
          {!isLoading && experiment_names.map(experiment =>
            <li key={experiment} className="experiment-item">
              <p>{experiment}</p>
              <button className='panel-button'
                      onClick={() => download(`${PROXY}/api/experiment-results/${experiment}`, experiment)}>Pobierz
                wyniki
              </button>
              <button className='panel-button' onClick={() => {
                console.log('Zaktualizowales plik')
              }}>Zaktualizuj eksperyment
              </button>
              <button className='panel-button' onClick={() => {
                console.log('Zaktualizowales sesje')
              }}>Zaktualizuj sesję testową
              </button>
              <button className='panel-button delete-button' onClick={() => {
                const confirmation = window.confirm('Czy jesteś pewien, że chcesz usunąć eksperyment?');
                if (confirmation) {
                  console.log('Usunales eksperyment!')
                } else {
                  console.log('Zdecydowales sie nie usuwac eksperymentu...')
                }
              }}>Usuń eksperyment
              </button>
            </li>
          )}
        </ul>
        <h3>Dodaj nowy eksperyment:</h3>
        <form>
          <label className="add-experiment-label">
            <input type="file" />
            Wybierz plik
          </label>
          <button className='panel-button'>
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdministrationPanel;