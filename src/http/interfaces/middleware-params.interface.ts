import { NextFunction, Request, Response } from 'express';

export interface IReq extends Request {}

export interface IRes extends Response {}

export interface INext extends NextFunction {}
