import {IMain, IDatabase} from 'pg-promise';
import * as pgPromise from 'pg-promise';
import {generateToken} from './token';

interface UserDetails {
    username: string;
    userPassword: string;
}

interface IExtensions {
    findUser(userId: number): Promise<any>;
    addUser(userDetails: UserDetails): Promise<any>;
    findToken(token: string): Promise<any>;
    login(userLoginDetails: UserDetails): Promise<any>;
}

const options = {
    extend: obj => {
        obj.findUser = userQuery => {
            return obj.any(`SELECT * FROM Users WHERE 1 = 1 ${userQuery}`);
        },
        obj.addUser = userRequest => {
            const {username, userPassword} = userRequest;
            const loginToken = generateToken(userRequest);
            return obj.one('INSERT INTO USERS (username, user_password, token) VALUES ($1, $2, $3) RETURNING userid, token', [username, userPassword, loginToken]);
        },
        obj.findToken = token => {
            return obj.one('SELECT * FROM USERS WHERE token = $1', [token]);
        },
        obj.login = userLoginDetails => {
            const {username, userPassword} = userLoginDetails;
            return obj.one('SELECT userid, token FROM USERS WHERE username = $1 AND user_password = $2', [username, userPassword]);
        }
    }
};

const cn:string = 'postgres://admin:admin@postgres:5432/users';

const pgp: IMain = pgPromise(options);

const db = <IDatabase<IExtensions>&IExtensions>pgp(cn);

export const getUser = async(userId) => {
    let userQuery;
    if (userId) {
        userQuery = `AND userid = ${userId}`;
    } else {
        userQuery = "";
    }
    return await db.findUser(userQuery);
}

export const addUser = async(userDetails) => {
    return await db.addUser(userDetails);
}

export const verifyToken = async(userToken) => {
    return await db.findToken(userToken);
}

export const login = async(userLoginDetails) => {
    return await db.login(userLoginDetails);
}