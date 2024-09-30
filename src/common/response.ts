import { HttpStatus } from '@nestjs/common';

export const handleResponse = (data: any, message: string, statusCode: HttpStatus) => {
  return {
    statusCode,
    message,
    data,
  };
};