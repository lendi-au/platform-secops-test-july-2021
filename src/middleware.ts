'use-strict';
import {verifyToken} from './db';

export const checkToken = async(req, res, next) => {
    const {token} = req.query;
    try {
        await verifyToken(token);
        return next();
    } catch (error) {
        next(error);
    }
}