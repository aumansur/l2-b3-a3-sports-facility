// import { NextFunction, Request, Response } from "express";
// import { AnyZodObject } from "zod";
// import catchAsync from "../utils/catchAsync";

// const validateRequest = (schema: AnyZodObject) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // if everything all is well next () ->

//     await schema.parseAsync({
//       body: req.body,
//     });

//     next();
//   });
// };

// export default validateRequest;

//================================================================
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

export default validateRequest;
