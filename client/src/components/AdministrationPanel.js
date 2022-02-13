import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import ExperimentResultContext from '../context/ExperimentResult/ExperimentResultContext';
import { PROXY } from '../App';
import axios from "axios";

const AdministrationPanel = () => {
  const authContext = useContext(AuthContext);
  const experimentResultContext = useContext(ExperimentResultContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ addMessage, setAddMessage ] = useState('');
  const [ message, setMessage ] = useState('');

  const { experiment_names, getAllExperimentResults } = experimentResultContext;
  const { token } = authContext;

  useEffect(() => {
    authContext.loadUser();
    getAllExperimentResults().then(() => {
      setIsLoading(false);
    });
  }, []);

  const download = async (url, filename) => {
    await fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(console.error);
  }

  const handleDelete = async (experiment) => {
    const confirmation = window.confirm('Czy jesteś pewien, że chcesz usunąć eksperyment?');
    if (confirmation) {
      try {
        const config = {
          headers: {
            'x-auth-token': token
          },
          data: {
            dataset_name: experiment
          }
        };
        const res = await axios.delete(`${PROXY}/api/experiment-results`, config);
        const message = res.data.msg
        console.log(message);
        setMessage(message);
      } catch (error) {
        const message = error.response.data.msg;
        console.error(message);
        setMessage(message);
      }
    } else {
      console.log('Zdecydowales sie nie usuwac eksperymentu...')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('new-experiment-file');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post(`${PROXY}/api/experiment-results`, file, config);
      const message = 'Pomyślnie dodano eksperyment'
      console.log(message);
      setAddMessage(message);
    } catch (error) {
      const message = error.response.data.msg;
      console.error(message);
      setAddMessage(message);
    }
  };

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
              <button className='panel-button delete-button' onClick={() => handleDelete(experiment)}>
                Usuń eksperyment
              </button>
            </li>
          )}
        </ul>
        <p>{message}</p>
      </div>
      <h3>Dodaj nowy eksperyment:</h3>
      <div className={'experiment-panel-add'}>
        <form onSubmit={handleSubmit}>
          <label className="add-experiment-label">
            <input type="file" id="new-experiment-file" name="new-experiment-file" />
            Wybierz plik
          </label>
          <button className='panel-button'>
            Dodaj
          </button>
          <p>{addMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default AdministrationPanel;