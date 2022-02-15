import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import ExperimentResultContext from '../context/ExperimentResult/ExperimentResultContext';
import { PROXY } from '../App';
import axios from "axios";

const AdministrationPanel = () => {
  const authContext = useContext(AuthContext);
  const experimentResultContext = useContext(ExperimentResultContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ testSessions, setTestSessions ] = useState([]);
  const [ addMessage, setAddMessage ] = useState('');
  const [ addTestSessionMessage, setAddTestSessionMessage ] = useState('');
  const [ message, setMessage ] = useState('');

  const { experiment_names, getAllExperimentResults } = experimentResultContext;
  const { token } = authContext;

  useEffect(() => {
    authContext.loadUser();
    getAllExperimentResults().then(() => {
      getTestSessions().then(testSessionsArr => {
        setTestSessions(testSessionsArr);
        setIsLoading(false);
      });
    });
  }, [ message, addMessage, addTestSessionMessage ]);

  const discardMessage = (messageSetter) => {
    setTimeout(() => {
      messageSetter('')
    }, 10000);
  };

  const download = async (url, filename) => {
    await fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(error => {
        setMessage(error);
      });
  };

  const handleExperimentDelete = async (experiment) => {
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
        setMessage(message);
        discardMessage(setMessage);
      } catch (error) {
        const message = error.response.data.msg;
        setMessage(message);
        discardMessage(setMessage);
      }
    }
  };

  const handleTestSessionDelete = async (experiment) => {
    const confirmation = window.confirm('Czy jesteś pewien, że chcesz usunąć sesję testową?');
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
        const res = await axios.delete(`${PROXY}/api/test-sessions`, config);
        const message = res.data.msg
        setMessage(message);
        discardMessage(setMessage);
      } catch (error) {
        const message = error.response.data.msg;
        setMessage(message);
        discardMessage(setMessage);
      }
    }
  };

  const handleExperimentSubmit = async (e) => {
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
      setAddMessage(message);
      discardMessage(setAddMessage);
    } catch (error) {
      const message = error.response?.data.msg;
      setAddMessage(message ?? 'Wystąpił błąd');
      discardMessage(setAddMessage);
    }
  };

  const handleTestSessionSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('new-test-session-file');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post(`${PROXY}/api/test-sessions`, file, config);
      const message = 'Pomyślnie dodano sesję testową'
      setAddTestSessionMessage(message);
      discardMessage(setAddTestSessionMessage);
    } catch (error) {
      const message = error.response?.data.msg;
      setAddTestSessionMessage(message ?? 'Wystąpił błąd');
      discardMessage(setAddTestSessionMessage);
    }
  };

  const getTestSessions = async () => {
    const res = await axios.get(`${PROXY}/api/test-sessions/`);
    return res.data;
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
              <button className="panel-button"
                      onClick={() => download(`${PROXY}/api/experiment-results/${experiment}`, experiment)}>Pobierz
                wyniki
              </button>
              <button className="panel-button delete-button" onClick={() => handleExperimentDelete(experiment)}>
                Usuń eksperyment
              </button>
              {testSessions.includes(experiment) &&
                <div className="test-session-container">
                  <button className="panel-button"
                          onClick={() => download(`${PROXY}/api/test-sessions/${experiment}`, experiment)}>
                    Pobierz sesję testową
                  </button>
                  <button className="panel-button delete-button" onClick={() => handleTestSessionDelete(experiment)}>
                    Usuń sesję testową
                  </button>
                </div>}
            </li>
          )}
        </ul>
        <p className="message">{message}</p>
      </div>
      <h3>Dodaj nowy eksperyment:</h3>
      <div className="experiment-panel-add">
        <form onSubmit={handleExperimentSubmit}>
          <label className="add-experiment-label">
            <input type="file" id="new-experiment-file" name="new-experiment-file" />
            Wybierz plik
          </label>
          <button className="panel-button">
            Dodaj
          </button>
          <p className="message">{addMessage}</p>
        </form>
      </div>
      <h3>Dodaj nową sesję testową:</h3>
      <div className="experiment-panel-add">
        <form onSubmit={handleTestSessionSubmit}>
          <label className="add-experiment-label">
            <input type="file" id="new-test-session-file" name="new-test-session-file" />
            Wybierz plik
          </label>
          <button className="panel-button">
            Dodaj
          </button>
          <p className="message">{addTestSessionMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default AdministrationPanel;