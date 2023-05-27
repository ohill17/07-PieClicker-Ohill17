
export default function validateRegistrationForm(formValues) {
  const result = {
    username: validateUserName(formValues.username),
    email: validateEmail(formValues.email),
    phone: validatePhone(formValues.phone),
    profession: validateProfession(formValues.profession),
    experience: validateExperience(formValues.experience),
  };

  let field, isValid = true;
  for (field in result) {
    isValid = isValid && result[field];
  }

  return {
    isValid,
    result,
  };
}

function validateUserName(username) {
  const pattern = /^[a-zA-Z]{3}/;
  return pattern.test(username);
}

// must be a valid email address.  Use a regular expression
function validateEmail(email) {
  const pattern2 =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return pattern2.test(email);
}

// must be a valid 10 digit phone number.  Use a regular expression
function validatePhone(phone) {
  const pattern3 = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

  return pattern3.test(phone)
}

// must be either school, college, trainee or employee.  No reg exp.
function validateProfession(profession) {
  const acceptedValues =/^(school|college|trainee|employee)$/;
  return acceptedValues.test(profession);
 
}

// must be beginner, intermediate or advanced.  Use a regular expression.
function validateExperience(experience) {
  const pattern4 = /^(beginner|intermediate|advanced)$/;

  return pattern4.test(experience);
}
