import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RatingPage = () => {
  const [ radio, setRadio ] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log('submitted');
    history.push('/video-player');
  };

  return (
    <div className="rating-page">
      <h3>Rate the video:</h3>
      <form onSubmit={handleSubmit}>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="5"
                   checked={radio === "5"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            excellent = 5
          </label>
        </div>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="4"
                   checked={radio === "4"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            good = 4
          </label>
        </div>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="3"
                   checked={radio === "3"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            fair = 3
          </label>
        </div>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="2"
                   checked={radio === "2"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            poor = 2
          </label>
        </div>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="1"
                   checked={radio === "1"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            bad = 1
          </label>
        </div>
        <button className="button">Send the rating</button>
      </form>
    </div>
  );
};

export default RatingPage;
