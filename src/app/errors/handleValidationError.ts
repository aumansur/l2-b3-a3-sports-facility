// import mongoose from "mongoose";
// import { TErrorSource, TGenericErrorResponse } from "../interface/error";

// const handleValidationError = (
//   error: mongoose.Error.ValidationError
// ): TGenericErrorResponse => {
//   const errorSources: TErrorSource = Object.values(error.errors).map(
//     (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
//       return {
//         path: val.path,
//         message: val?.message,
//       };
//     }
//   );

//   const statusCode = 400;
//   {
//     return {
//       statusCode,
//       message: " validation error",
//       errorSources,
//     };
//   }
// };

// export default handleValidationError;

//============================================================================

import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleValidateError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSource: TErrorSource[] = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });

  const statusCode = 400;
  const message = err.message || "Validation Error";

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default handleValidateError;
