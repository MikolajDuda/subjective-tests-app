import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TestSessionContext from '../context/TestSession/TestSessionContext';
import FastSpeedtest from "fast-speedtest-api";
import ExperimentResultContext from "../context/ExperimentResult/ExperimentResultContext";

const RatingPage = () => {
  const history = useHistory();
  const testSessionContext = useContext(TestSessionContext);
  const experimentResultContext = useContext(ExperimentResultContext);
  const [ radio, setRadio ] = useState(null);

  const { dataset_name, current_pvs_array_id, pvs, subject, setVideoRating, clearTestSession } = testSessionContext;
  const { addCharacteristicToSubject } = experimentResultContext;

  const testSpeed = async () => {
    const speedtest = new FastSpeedtest({
      token: 'YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm',
      verbose: false,
      timeout: 500,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.bps
    });

    return await speedtest.getSpeed().then(speed => {
      return `${speed} bps`;
    });
  }

  const getResolution = () => {
    const realWidth = window.screen.width * window.devicePixelRatio;
    const realHeight = window.screen.height * window.devicePixelRatio;
    return `${realWidth} x ${realHeight}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVideoRating(dataset_name, radio, current_pvs_array_id, pvs, subject.id);

    if (current_pvs_array_id === 0) {
      await addCharacteristicToSubject(dataset_name, subject.id, {
        screen_resolution: getResolution()
      });

      await testSpeed().then(speed => {
        addCharacteristicToSubject(dataset_name, subject.id, {
          last_rating_internet_speed: speed
        });
      });
    }

    if (current_pvs_array_id >= pvs.length - 1) {
      await testSpeed().then(speed => {
        addCharacteristicToSubject(dataset_name, subject.id, {
          last_rating_internet_speed: speed
        });

        clearTestSession();
        history.push('/');
        }
      );
    } else {
      history.push('/video-player');
    }
  };

  return (
    <div className="rating-page">
      <h3>Oceń jakość wideo:</h3>
      <form onSubmit={handleSubmit}>
        <div className="radio-container">
          <label>
            <input type="radio"
                   value="5"
                   checked={radio === "5"}
                   onChange={(e) => {
                     setRadio(e.target.value);
                   }} />
            świetna = 5
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
            dobra = 4
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
            przeciętna = 3
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
            słaba = 2
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
            zła = 1
          </label>
        </div>
        <button className="button">Zatwierdź ocenę</button>
      </form>
    </div>
  );
};

export default RatingPage;
