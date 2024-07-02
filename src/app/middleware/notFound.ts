// // import { error } from 'console'
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";

// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: "API Not Found",
//     error: "",
//   });
//   next();
// };
// export default notFound;

//================================================================
import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "api not found",
  });
  next();
};

export default notFound;
