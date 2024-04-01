import { Session, SessionData as SD } from 'express-session';
import { SessionData } from './SessionData';
import { Request } from "express";

export interface MyRequest extends Request {
    session: Session & Partial<SD> & SessionData;
    cookies: {
        rememberMeToken: string;
    }
}