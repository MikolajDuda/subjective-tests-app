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

  return (
    <div className="administration-panel">
      <h2>Panel administracyjny</h2>
      <div className="experiment-panel-list">
        <h3>Zarządzaj eksperymentami:</h3>
        {!isLoading && experiment_names.map(experiment =>
          <a href={`${PROXY}/api/experiment-results/${experiment}`}>
            {experiment}
          </a>
        )}
      </div>
    </div>
  );
};

export default AdministrationPanel;