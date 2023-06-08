export default function validateRegistrationForm(formValues) {
  const result = {
    username: validateUserName(formValues.username),
    password: validatePassword(formValues.password),
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
  const pattern = /^[a-zA-Z]+/;
  return pattern.test(username);
}

function validatePassword(password) {
  const pattern = /^[a-zA-Z0-9]+/;
  return pattern.test(password);
}