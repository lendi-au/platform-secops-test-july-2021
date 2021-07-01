import * as jwt from 'jsonwebtoken';

export const generateToken = (userDetails) => {
    const d = new Date();
    const jsonKey = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    const token = jwt.sign(userDetails, jsonKey);
    return token;
}