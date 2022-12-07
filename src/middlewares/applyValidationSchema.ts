// import type express from 'express';
// import { body, validationResult } from 'express-validator';

// export const registerScheme = (req: express.Request, res: express.Response) => {
//   body('fullName', 'Enter your name').notEmpty();
//   body('email', 'Enter email').notEmpty();
//   body('password', 'The password must be between 4 and 16 characters').isLength(
//     { min: 4, max: 16 }
//   );
//   body('dateOfBirth', 'Enter your date of birth');

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
// };

// export const loginScheme = (req: express.Request, res: express.Response) => {
//   body('fullName', 'Enter your name').notEmpty();
//   body('password', 'The password must be between 4 and 16 characters').isLength(
//     { min: 4, max: 16 }
//   );

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
// };
