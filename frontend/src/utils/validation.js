export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (...fields) => {
  return fields.every(
    field => field.toString().trim() !== ""
  );
};

export const validateCapacity = (capacity) => {
  return Number(capacity) > 0;
};

export const validateDate = (start, end) => {
  return new Date(start) <= new Date(end);
};