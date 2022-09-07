export const checkEmail = (value) => {
  if (value.trim().length === 0) return "Email is required";
  if (
    !value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return "Please enter your email";
};

export const checkPassword = (value) => {
  if (value.trim().length === 0) return "Password is required";
  if (value.trim().length < 6) return "Password must be at least 6 characters";
};

export const checkConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword.trim().length === 0)
    return "Confirm password is required";
  if (confirmPassword !== password)
    return "Please make sure your passwords match";
};
