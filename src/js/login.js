import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';
import toastr from 'toastr';
import 'toastr/toastr.scss';
const regeneratorRuntime = require("regenerator-runtime");

class Signup {
  constructor() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', this.onFormSubmit.bind(this));
  }

  onFormSubmit(event) {
    event.preventDefault();
    const formValues = this.getFormValues();
    this.user = {
      username: formValues.username,
      password: formValues.password,
      gameData: {
        totalPies: 0,
        upgrades: {
          whiteMoms: {
            count: 0,
            cost: 50,
          },
          fasterOvens: {
            count: 0,
            cost: 1000,
          },
          blastOvens: {
            count: 0,
            cost: 3000,
          },
        },
      },
    };

    const validationResult = validateRegistrationForm(formValues);
    if (validationResult.isValid) {
      this.clearErrors();
      this.handleSubmit();
      this.toMainPage();
      this.resetForm();
      toastr.success('Signup was successful!');
    } else {
      this.clearErrors();
      this.highlightErrors(validationResult);
    }
  }

  getFormValues() {
    return {
      username: document.getElementById('username').value || '',
      password: document.getElementById('password').value || '',
    };
  }

  handleSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.user),
    };
    let SERVER_URL = "http://citweb.lanecc.net:5014/participants"
    fetch(SERVER_URL, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log('Game data saved successfully!');
        } else {
          console.log('Failed to save game data.');
        }
      })
      .catch((error) => {
        console.log('An error occurred while saving game data.');
      });
  }

  resetForm() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    usernameInput.value = '';
    passwordInput.value = '';
  }

  highlightErrors(result) {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!result.username) {
      usernameInput.classList.add('is-invalid');
    } else {
      usernameInput.classList.remove('is-invalid');
    }

    if (!result.password) {
      passwordInput.classList.add('is-invalid');
    } else {
      passwordInput.classList.remove('is-invalid');
    }

  }

  clearErrors() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
  
  }
  toMainPage() {
    window.location.href = 'index.html';
  }

}

const signup = new Signup();
window.signup = signup;