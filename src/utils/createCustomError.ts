export class CustomError<P> extends Error {
  localData: {
    message: string;
    status: number;
    payload?: P;
  };
}

export const customError = <P>(
  status: number,
  message: string,
  payload?: P
) => {
  const err = new CustomError<P>(message);
  err.localData = {
    message,
    status,
    payload,
  };
  return err;
};
