import { isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (!isValidUsername(username)) {
    return {
      isValid: false,
      errorMessage: "Invalid username",
    };
  }
};

export const verifyCodeValidator = (code) => {
  if (code.length < 6) {
    return {
      isValid: false,
      errorMessage: "Invalid code",
    };
  }
  if (code.length > 6) {
    return {
      isValid: false,
      errorMessage: "Invalid code",
    };
  }
  if (!/^[0-9]+$/.test(code)) {
    return {
      isValid: false,
      errorMessage: "Invalid code",
    };
  }
  return {
    isValid: true,
  };
};
