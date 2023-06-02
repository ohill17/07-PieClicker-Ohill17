import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';
import toastr from 'toastr';
import 'toastr/toastr.scss';
const regeneratorRuntime = require("regenerator-runtime");

class Signup {
  constructor(usernameId, passwordId) {
    this.username = document.getElementById("username").value;
    this.password = document.getElementById("password").value;
    this.user = {
      username: "",
      password: "",
      gameData: {
        totalPies: 0,
        upgrades: {
          whiteMoms: {
            count: 0,
            cost: 100,
          },
          fasterOvens: {
            count: 0,
            cost: 2000,
          },
          blastOvens: {
            count: 0,
            cost: 6000,
          },
        },
      },
    }


    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', this.onFormSubmit.bind(this));
  }
  onFormSubmit(event) {
    event.preventDefault();

    const formValues = this.getFormValues();
    const validationResult = validateRegistrationForm(formValues);
    console.log(validationResult);
    if (validationResult.isValid) {
      this.clearErrors();
      this.handleSubmit(formValues);
    } else {
      this.clearErrors();
      this.highlightErrors(validationResult);
    }
  }

  getFormValues() {
    return {
      username: this.username.value || '',
      password: this.password.value || '',
    };
  }

  handleSubmit() {

    // Perform AJAX request to save gameData
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.user),
    };

    fetch(SERVER_URL, requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('Game data saved successfully!');
        } else {
          console.log('Failed to save game data.');
        }
      })
      .catch(error => {
        console.log('An error occurred while saving game data.');
      });
  }
  resetForm() {
    this.username.value = '';
    this.password.value = '';
  }
  highlightErrors(result) {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
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
    // Add similar logic for other fields
  }
  clearErrors() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    
    usernameInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    // Remove 'is-invalid' class from other fields if needed
  }
}

// Instantiate the Game class
const signup = new Signup();
window.signup = signup;
