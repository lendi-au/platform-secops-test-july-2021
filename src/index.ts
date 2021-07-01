import * as express from 'express';
import { getUser,addUser,login } from './db';
import * as pino from 'express-pino-logger';
import * as bodyParser from 'body-parser';
import {checkToken} from './middleware';
import {getS3Image} from './s3';

const app = express();
app.use(pino());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', express.static('public'));

app.get('/user/:userId?', checkToken, async(req: any, response) => {
    const {userId} = req.params;
    const userInfo = await getUser(userId);
    req.log.info(userInfo);
    response.send(userInfo);
});

app.get('/user/image/:userId?', checkToken, async(req: any, response) => {
    const {userId} = req.params;
    const image = await getS3Image(userId);
    response.contentType('image/jpeg');
    response.end(image, 'binary');
});

app.post('/login', async(req: any, response) => {
    const loginDetails = await login(req.body);
    response.send(loginDetails);
});

app.post('/create', async(req: any, response) => {
    req.log.info(req.body);
    const newUser = await addUser(req.body);
    response.send(newUser);
});

app.listen('8000', () => console.info('App started: http://localhost:8000'))
