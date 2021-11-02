import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import RatingPage from './RatingPage/RatingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/video-player">
              <VideoPlayer url={"http://localhost:3001/video"}/>
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
