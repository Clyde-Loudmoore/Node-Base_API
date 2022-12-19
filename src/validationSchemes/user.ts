import * as yup from 'yup';

const fullName = yup.string().max(25);
const dateOfBirth = yup.date();

const requiredEmail = yup
  .string().email('Invalid email address')
  .min(12, 'The minimum email length is 12 characters').max(30, 'The maximum email length is 16 characters').required('Enter email');
const requiredPassword = yup.string().min(4, 'The minimum password length is 4 characters').max(16, 'The maximum password length is 16 characters').required('Enter password');
const requiredPasswordLog = yup.string().required('Enter your password');
const requiredNewPassword = yup.string().min(4, 'The minimum password length is 4 characters').max(16, 'The maximum password length is 16 characters').required('Enter password');
const requiredParamsId = yup.number().integer().min(1).required();

const sharedValidation = {
  requiredParamsId,
  fullName,
  requiredEmail,
  requiredPassword,
  requiredNewPassword,
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
    newPassword: sharedValidation.requiredNewPassword,
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

export default { registration, login, editUser, editUserPass, deleteUser };
