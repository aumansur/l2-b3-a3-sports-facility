/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { AppError } from "../errors/AppError";
import handleValidateError from "../errors/handleValidationError";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;

  let message = err.message || "something went wrong";
  let errorMessage: TErrorSource[] = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const manageZodError = handleZodError(err);
    message = manageZodError.message;
    errorMessage = manageZodError.errorMessage;
  } else if (err?.name === "ValidationError") {
    const manageMongooseError = handleValidateError(err);
    message = manageMongooseError.message;
    errorMessage = manageMongooseError.errorSource;
  } else if (err.code == 11000) {
    const manageDuplicateError = handleDuplicateError(err);
    message = manageDuplicateError.message;
    errorMessage = manageDuplicateError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessage = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: err.stack,
  });
  next();
};
