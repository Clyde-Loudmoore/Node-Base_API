import * as yup from 'yup';

const fullName = yup.string().max(25);
const dateOfBirth = yup.date();

const requiredEmail = yup
  .string()
  .email('Invalid email address')
  .required('Enter email');
const requiredPassword = yup.string().min(4).max(16).required();
const requiredNewPassword = yup.string().min(4).max(16).required();
const requiredParamsId = yup.number().integer().min(1).required();

const sharedValidation = {
  requiredParamsId,
  fullName,
  requiredEmail,
  requiredPassword,
  requiredNewPassword,
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
    password: sharedValidation.requiredPassword,
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
