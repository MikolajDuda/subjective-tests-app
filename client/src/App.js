import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import VideoPlayer from './components/VideoPlayer';
import RatingPage from './components/RatingPage';
import Form from './components/Form';
import TestSessionState from './context/TestSession/TestSessionState';
import AuthState from './context/Auth/AuthState';
import Login from './components/Login';
import setAuthToken from './utils/setAuthToken';
import AdministrationPanel from './components/AdministrationPanel';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import ExperimentList from './components/ExperimentsList';
import ExperimentResultState from './context/ExperimentResult/ExperimentResultState';
import InstructionPlayer from "./components/InstructionPlayer";

export const PROXY = 'http://localhost:3001';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TestSessionState>
        <ExperimentResultState>
          <Router>
            <div className="App">
              <div className="content">
                <Switch>
                  <Route exact path="/">
                    <Navbar />
                    <Home />
                  </Route>
                  <Route exact path="/login">
                    <Navbar />
                    <Login />
                  </Route>
                  <PrivateRoute exact path="/register">
                    <Navbar />
                    <Register />
                  </PrivateRoute>
                  <PrivateRoute exact path="/administration-panel">
                    <Navbar />
                    <AdministrationPanel />
                  </PrivateRoute>
                  <Route path="/personal-form">
                    <Navbar />
                    <Form />
                  </Route>
                  <Route path="/experiment-list">
                    <ExperimentList />
                  </Route>
                  <Route path="/video-player">
                    <VideoPlayer />
                  </Route>
                  <Route path="/instruction">
                    <InstructionPlayer />
                  </Route>
                  <Route path="/rate">
                    <RatingPage />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
        </ExperimentResultState>
      </TestSessionState>
    </AuthState>
  );
};

export default App;
