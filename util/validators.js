module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
    // Check if email is a valid email
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-Za-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      error.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    error.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    // Boolean check to see if the length of keys in the object is less than 1 (no errors)
    valid: Object.keys(errors).length < 1,
  };
};
