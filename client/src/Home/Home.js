import { Link } from 'react-router-dom';

const Home = () => {
  // TODO: zapytać promotora co wyświetlać na głównej stronie
  return (
    <div className="home">
      <div className="container">
        <button className="button">What are subjective tests?</button>
      </div>
      <div className="container">
        <Link to="/video-player">
          <button className="button">Start test</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;