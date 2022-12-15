type PayloadType = Array<{
  key?: string[];
  message?: string;
  errors?: string[];
  inner?: string[];
}>;

class CustomError extends Error {
status: number;

message: string;

payload?: PayloadType;

constructor(status: number, message: string, payload?: PayloadType) {
  super(message);
  this.status = status;
  this.message = message;
  this.payload = payload;
}
}

export default CustomError;