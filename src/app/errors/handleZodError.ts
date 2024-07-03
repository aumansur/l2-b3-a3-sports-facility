import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError) => {
  const errorMessage = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "zod Validation error",
    errorMessage,
  };
};
