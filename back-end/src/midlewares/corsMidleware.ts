/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

function corsMidleWare(request: Request, response: Response, next: NextFunction) {
  response.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN!);
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');
  next();
}

export default corsMidleWare;
