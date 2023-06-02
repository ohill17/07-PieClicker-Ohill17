
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
  const pattern = /^[a-zA-Z]{3}/;
  return pattern.test(username);
}

// password
function validatePassword(password) {
  const pattern2 =  /^[a-zA-Z0-9]{4}/;
  return pattern2.test(password);
}