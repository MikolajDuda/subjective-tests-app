import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ExperimentResultContext from '../context/ExperimentResult/ExperimentResultContext';
import TestSessionContext from '../context/TestSession/TestSessionContext';


const ExperimentList = () => {
  const history = useHistory();
  const experimentResultContext = useContext(ExperimentResultContext);
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);

  const { experiment_names, getAllExperimentResults } = experimentResultContext;
  const { setDatasetName, clearTestSession } = testSessionContext;

  useEffect(() => {
    getAllExperimentResults().then(() => {
      setIsLoading(false);
    });
  }, []);

  const onClick = (e) => {
    clearTestSession();
    setDatasetName(e.target.innerText);
    history.push('/video-player');
  };

  return (
    <div className="experiment-list">
      <h2>Wybierz jeden z dostępnych eksperymentów, żeby rozpocząć test.</h2>
        {!isLoading && experiment_names.map(experiment =>
          <a href="" onClick={onClick}>
            {experiment}
          </a>
        )}
    </div>
  );
};

export default ExperimentList;