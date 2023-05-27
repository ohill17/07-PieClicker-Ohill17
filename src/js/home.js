import './general';
const regeneratorRuntime = require("regenerator-runtime");


/* Part 1 - Check out the validation module in services/formValidation */
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';

import toastr from 'toastr';
import 'toastr/toastr.scss';

class Home {
  constructor() {
    this.$form = document.getElementById("registrationForm");
    this.$username = document.getElementById("username");
    this.$email = document.getElementById("email");
    this.$phone = document.getElementById("phone");
    this.$profession = document.getElementById("profession");
    this.$experience = document.getElementById("experience");
    this.$comment = document.getElementById("comment");
    this.$submit = document.getElementById("submit");
    this.$loadingIndicator = document.getElementById("loadingIndicator");

    this.$form.addEventListener('submit', this.onFormSubmit.bind(this));
  }

  onFormSubmit(event) {
    event.preventDefault();

    const formValues = this.getFormValues();
    const validationResult = validateRegistrationForm(formValues);
console.log(validationResult);
    if (validationResult.isValid) {
      this.clearErrors();
      this.submitForm(formValues);
    } else {
      this.clearErrors();
      this.highlightErrors(validationResult);
    }
  }

  getFormValues() {
    return {
      username: this.$username.value || '',
      email: this.$email.value || '',
      phone: this.$phone.value || '',
      profession: this.$profession.value || '',
      experience: (document.querySelector('input[name="experience"]:checked') || {}).value || '',
      comment: this.$comment.value || ''
    };
  }

  resetForm() {
    this.$username.value = '';
    this.$email.value = '';
    this.$phone.value = '';
    this.$profession.value = 'school';
    this.$experience.checked = true;
    this.$comment.value = ''; // Reset the comment field
  }
  highlightErrors(result) {
    if (!result.username) {
      this.$username.classList.add('is-invalid');
    }
    // Add similar logic for other fields
  }

  clearErrors() {
    this.$username.classList.remove('is-invalid');
    // Remove 'is-invalid' class from other fields
  }

  submitForm(formValues) {
    this.$submit.classList.add('visually-hidden');
    this.$loadingIndicator.classList.remove('visually-hidden');

    

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    };

    fetch(SERVER_URL, requestOptions)
      .then(response => {
        if (response.ok) {
          this.$submit.classList.remove('visually-hidden');
          this.$loadingIndicator.classList.add('visually-hidden');
          const message = `Thank you, ${formValues.username}! Your registration has been submitted.`;
          toastr.success(message);
          this.resetForm();
        } else {
          this.$submit.classList.remove('visually-hidden');
          this.$loadingIndicator.classList.add('visually-hidden');
          const errorMessage = `Error (${response.status}): ${response.statusText}`;
          toastr.error(errorMessage);
        }
      })
      .catch(error => {
        this.$submit.classList.remove('visually-hidden');
        this.$loadingIndicator.classList.add('visually-hidden');
        toastr.error('An error occurred. Please try again.');
      });
    
  }
}

window.onload = () => {
  new Home();
};