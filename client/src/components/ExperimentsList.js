import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ExperimentResultContext from '../context/ExperimentResult/ExperimentResultContext';
import TestSessionContext from '../context/TestSession/TestSessionContext';

const ExperimentList = () => {
  const history = useHistory();
  const experimentResultContext = useContext(ExperimentResultContext);
  const testSessionContext = useContext(TestSessionContext);
  const [ isLoading, setIsLoading ] = useState(true);

  const { experiment_names, getAllExperimentResults, addSubjectToExperimentResult } = experimentResultContext;
  const { setDatasetName, clearTestSession, subject, addSubjectToTestSession } = testSessionContext;

  useEffect(() => {
    getAllExperimentResults().then(() => {
      setIsLoading(false);
    });
  }, []);

  const onClick = (e) => {
    const datasetName = e.target.innerText;
    const subjectTemp = subject;
    clearTestSession();
    setDatasetName(datasetName);
    addSubjectToTestSession(subject);
    addSubjectToExperimentResult(datasetName, subject);
    history.push('/instruction');
  };

  return (
    <div className="experiment-list">
      <h2>Wybierz jeden z dostępnych eksperymentów, żeby rozpocząć test.</h2>
      <ul>
        {!isLoading && experiment_names.map(experiment =>
          <li key={experiment} onClick={onClick}>
            {experiment}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ExperimentList;