import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    name: "",
    age: "",
    city: "",
    roleApplied: "mern",
    message: "",
    terms: false,
    errors: {
      errName: "",
      errAge: "",
      errCity: "",
      errMessage: "",
      errTerms: "",
    },
  });

  //state for button
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "terms") {
      // || type== "checkbox" value= checked
      setState((prev) => ({ ...prev, [name]: checked }));
    } else setState((prev) => ({ ...prev, [name]: value }));

    //console.log(e.target.name, e.target.type, e.target.value, e.target.checked);
    //console.log(checked, state.terms);

    // for displaying error messages
    let errors = {};

    switch (name) {
      case "name":
        if (state.name.length < 2 || /[^a-zA-Z]/g.test(state.name)) {
          errors.errName = "enter valid name";
          setIsDisabled(true);
        } else {
          errors.errName = "";
        }
        break;
      case "age":
        if (/[a-zA-Z]/g.test(state.age)) {
          errors.errAge = "enter age in number";
          setIsDisabled(true);
        } else {
          errors.errAge = "";
        }
        break;
      case "city":
        if (state.city.length < 2 || /[^a-zA-Z]/g.test(state.city)) {
          errors.errCity = "enter valid city name";
          setIsDisabled(true);
        } else {
          errors.errCity = "";
        }

        break;

      case "message":
        if (state.message.length < 3) {
          errors.errMessage = "message too short";
          setIsDisabled(true);
        } else {
          errors.errMessage = "";
        }

        break;
      case "terms":
        if (!state.terms) {
          errors.errTerms = "";
          setIsDisabled(false);
        } else {
          errors.errTerms = "accept the terms to proceed";
          setIsDisabled(true);
        }
        break;
      default: {
        errors.errName = "";
      }
    }
    setState((prev) => ({ ...prev, errors: errors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setState((prev) => ({
      ...prev,
      name: "",
      age: "",
      city: "",
      roleApplied: "mern",
      message: "",
      terms: false,
    }));
    setIsDisabled(true);
  };

  return (
    <div className="App">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            name="name"
            value={state.name}
            type="text"
          ></input>
          <p>{state.errors.errName}</p>
        </div>
        <div>
          <label>Age</label>
          <input
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            name="age"
            type="number"
            value={state.age}
          ></input>
          <p>{state.errors.errAge}</p>
        </div>
        <div>
          <label>City</label>
          <input
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            name="city"
            value={state.city}
          ></input>
          <p>{state.errors.errCity}</p>
        </div>
        <div>
          <label>Role Applied for</label>
          <select
            name="roleApplied"
            onChange={(e) => handleChange(e)}
            value={state.roleApplied}
          >
            <option value="react">React Developer</option>
            <option value="mern">MERN Developer</option>
            <option value="frontEnd">Front-end Developer</option>
          </select>
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            rows="0"
            cols="20"
            placeholder="message here"
            name="message"
            value={state.message}
          ></textarea>
          <p>{state.errors.errMessage}</p>
        </div>
        <div>
          <input
            type="checkbox"
            name="terms"
            onChange={(e) => handleChange(e)}
            checked={state.terms}
          ></input>
          <label>Agree to terms and conditions</label>
          <p>{state.errors.errTerms}</p>
        </div>
        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
