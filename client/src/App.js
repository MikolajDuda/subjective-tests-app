import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import VideoPlayer from './components/VideoPlayer';
import RatingPage from './components/RatingPage';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <div className="App">
        {/*<Navbar />*/}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/personal-form">
              <Form />
            </Route>
            <Route path="/video-player">
              <VideoPlayer url={"http://localhost:3001/api/video"}/>
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
  );
}

export default App;
