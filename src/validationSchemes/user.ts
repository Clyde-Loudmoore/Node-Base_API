import * as yup from 'yup';

const registration = yup.object({
  body: yup.object({
    fullName: yup.string().trim().required('Enter your full name'),
    email: yup.string().email('Invalid email address').required('Enter email'),
    password: yup
      .string()
      .min(4, 'Please enter a password more than 1 character')
      .max(16, 'Please enter a password shorter than 16 characters')
      .required('Enter password'),
    dateOfBirth: yup.date().required('Enter your date of birth'),
  }),
});

const login = yup.object({
  body: yup.object({
    email: yup.string().email().required('Enter email'),
    password: yup
      .string()
      .trim()
      .min(4, 'Please enter a password more than 1 character')
      .max(16, 'Please enter a password shorter than 16 characters')
      .required('Enter password'),
  }),
});

const editUser = yup.object({
  body: yup.object({
    fullName: yup
      .string()
      .max(25, 'please enter correctly name & last name')
      .required('Enter your full name'),

    email: yup.string().email('Invalid email address').required('Enter email'),

    dateOfBirth: yup.date().required('Enter your date of birth'),
  }),
});

const editUserPass = yup.object({
  body: yup.object({
    password: yup
      .string()
      .min(4, 'password cannot be shorter than 4 characters')
      .max(16, 'password cannot be longer than 16 character')
      .required('Enter password'),
  }),
});

export default { registration, login, editUser, editUserPass };
