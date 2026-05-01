import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("💥 Unhandled Error:", err.stack || err.message);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : "Error",
    message,
  });
};
