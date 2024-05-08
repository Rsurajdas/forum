function isValidEmail(value) {
  return value
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function isValidUsername(value) {
  return value && value.trim().length <= 15 && value.trim().length >= 5;
}

function isValidPassword(value) {
  return value
    .trim()
    .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
}

// Validate User
export function validateUser(credentials) {
  const validationErrors = {};

  if (!isValidEmail(credentials.email)) {
    validationErrors.email = "Invalid email address";
  }

  if (credentials.username && !isValidUsername(credentials.username)) {
    validationErrors.username =
      "Invalid username, it should contain 5 to 12 characters.";
  }

  if (!isValidPassword(credentials.password)) {
    validationErrors.password =
      "Password should contain at least one number and at least one special character";
  }

  if (Object.keys(validationErrors).length) {
    throw validationErrors;
  }
}
