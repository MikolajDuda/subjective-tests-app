import { useHistory } from 'react-router-dom';

const Form = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log('submitted');
    history.push('/experiment-list');
  };

  return (
    <div className="form-page">
      <h3>Ankieta osobowa:</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label>Wiek: </label>
          <br />
          <input type="number" name="age" id="age" min="1" max="150" required />
        </div>
        <div className="form-container">
          <label>Płeć: </label>
          <br />
          <select name="gender" id="gender">
            <option disabled selected value> -- wybierz płeć --</option>
            <option value="male">mężczyzna</option>
            <option value="female">kobieta</option>
            <option value="other">inna</option>
          </select>
        </div>
        <div className="form-container">
          <label>Wykształcenie: </label>
          <br />
          <select name="education" id="education">
            <option disabled selected value> -- wybierz poziom wykształcenia --</option>
            <option value="primary">podstawowe</option>
            <option value="secondary">średnie</option>
            <option value="higher">wyższe</option>
          </select>
        </div>
        <div className="form-container">
          <label>Czy posiadasz wadę wzroku?: </label>
          <br />
          <select name="vision-defect" id="vision-defect">
            <option disabled selected value> -- wybierz --</option>
            <option value="yes">tak</option>
            <option value="no">nie</option>
          </select>
        </div>
        <div className="form-container">
          <label>Czy w swojej pracy zawodowej zajmujesz się multimediami <br />(montażem nagrań wideo, obróbką graficzną
            etc.)?: </label>
          <br />
          <select name="multimedia-related-work" id="multimedia-related-work">
            <option disabled selected value> -- wybierz --</option>
            <option value="yes">tak</option>
            <option value="no">nie</option>
          </select>
        </div>

        <button className="button">Potwierdź</button>
      </form>
    </div>
  );
};

export default Form;