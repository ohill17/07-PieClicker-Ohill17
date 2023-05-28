import './general';
const regeneratorRuntime = require("regenerator-runtime");


/* Part 1 - Check out the validation module in services/formValidation */
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';

import toastr from 'toastr';
import 'toastr/toastr.scss';

class Pie{
  constructor(){
    this.pie = document.getElementById("pie");
    this.pie.addEventListener('submit')
  }
  onFormSubmit(event){
    event.preventDefault();
    this.pie.onclick = console.log("clicked");
  }
}