import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import VideoPlayer from './components/VideoPlayer';
import RatingPage from './components/RatingPage';
import Form from './components/Form';
import TestSessionState from './context/testSession/TestSessionState';
import AuthState from './context/auth/AuthState';
import Login from './components/Login';
import setAuthToken from './utils/setAuthToken';
import AdministrationPanel from './components/AdministrationPanel';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

export const PROXY = 'http://localhost:3001';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TestSessionState>
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
                <Route exact path="/register">
                  <Navbar />
                  <Register />
                </Route>
                <PrivateRoute exact path="/administration-panel">
                  <Navbar />
                  <AdministrationPanel />
                </PrivateRoute>
                <Route path="/personal-form">
                  <Form />
                </Route>
                <Route path="/video-player">
                  <VideoPlayer />
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
      </TestSessionState>
    </AuthState>
  );
};

export default App;
