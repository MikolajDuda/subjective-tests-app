import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div>
        <h2>Platforma do przeprowadzania subiektywnych badań jakości wideo</h2>
        <p>Kliknij przycisk START, aby rozpocząć</p>
      </div>
      <Link to="/personal-form">
        <button className="button">START</button>
      </Link>
    </div>
  );
};

export default Home;