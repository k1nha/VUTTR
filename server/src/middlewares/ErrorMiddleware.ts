import { Request, Response, NextFunction } from "express";

const ErrorRequestHandle = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Ohh you are lost, read the API documentation to find your way back home :)")

  res.status(404).json(`${error}`);  
}


export { ErrorRequestHandle }