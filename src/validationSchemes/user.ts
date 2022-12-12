import * as yup from 'yup';

const registration = yup.object({
  body: yup.object({
    fullName: yup.string().trim().required('Enter your full name'),
    email: yup.string().trim().required('Enter your valid email'),
    password: yup
      .string()
      .trim()
      .min(4, 'Please enter a password more than 1 character')
      .max(16, 'Please enter a password shorter than 16 characters')
      .required('Enter password'),
    dateOfBirth: yup.date().required('Enter your date of birth'),
  }),
});

const login = yup.object({
  body: yup.object({
    email: yup.string().trim().required('Enter your valid email'),
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
      .trim()
      .ensure()
      .max(25, 'please enter correctly name & last name')
      .required('this field is required'),

    email: yup
      .string()
      .trim()
      .ensure()
      .required('this field is required')
      .email('please enter valid email'),

    dateOfBirth: yup.date().required('this field is required'),
  }),
});

const editUserPass = yup.object({
  body: yup.object({
    password: yup
      .string()
      .trim()
      .ensure()
      .required('this field is required')
      .min(4, 'password cannot be shorter than 4 characters')
      .max(16, 'password cannot be longer than 16 character'),
  }),
});

export default { registration, login, editUser, editUserPass };
