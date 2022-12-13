import * as yup from 'yup';

const fullName = yup.string().max(25).required();
const email = yup
  .string()
  .email('Invalid email address')
  .required('Enter email');
const passwordReg = yup.string().min(4).max(16).required();
const passwordLog = yup.string().required();
const dateOfBirth = yup.date().required('Please enter youe date of birth');

const requiredEmail = email.required();
const requiredPassword = passwordReg.required();

const sharedValidation = {
  fullName,
  requiredEmail,
  passwordLog,
  requiredPassword,
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
    password: sharedValidation.passwordLog,
  },
};

const editUser = {
  body: {
    fullName: sharedValidation.fullName,

    email: sharedValidation.requiredEmail,

    dateOfBirth: sharedValidation.dateOfBirth,
  },
};

const editUserPass = {
  body: {
    password: sharedValidation.requiredPassword,
  },
};

export default { registration, login, editUser, editUserPass };
