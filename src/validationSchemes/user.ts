import * as yup from 'yup';

const fullName = yup.string().max(25);
const dateOfBirth = yup.date();

const requiredEmail = yup.string().email('Invalid email address').required('Enter email');
const password = yup.string().min(4, 'The minimum password length is 4 characters').max(16, 'The maximum password length is 16 characters');
const requiredPassword = password.required('Enter password');
const requiredPasswordLog = yup.string().required('Enter your password');
const requiredParamsId = yup.number().integer().min(1).required();

const sharedValidation = {
  requiredParamsId,
  fullName,
  requiredEmail,
  requiredPassword,
  requiredPasswordLog,
  dateOfBirth,
};

const registration = {
  body: {
    fullName: sharedValidation.fullName,
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredPassword,
    dateOfBirth: sharedValidation.dateOfBirth,
  },
};

const login = {
  body: {
    email: sharedValidation.requiredEmail,
    password: sharedValidation.requiredPasswordLog,
  },
};

const editUser = {
  body: {
    fullName: sharedValidation.fullName,
    email: sharedValidation.requiredEmail,
    dateOfBirth: sharedValidation.dateOfBirth,
  },
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

const editUserPass = {
  body: {
    password: sharedValidation.requiredPassword,
    newPassword: sharedValidation.requiredPassword,
  },
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

const deleteUser = {
  params: {
    userId: sharedValidation.requiredParamsId,
  },
};

export default {
  registration,
  login,
  editUser,
  editUserPass,
  deleteUser,
};
