import * as AWS from 'aws-sdk';
const creds = new AWS.Credentials('AKIAISK54M5LZAVTNK2Q', 'ezm+01exeBF4RwG48T5RZwW4Rk31dgmws65GuciU');
AWS.config.credentials = creds;
const s3 = new AWS.S3();

export const getS3Image = async(userId) => {
    const params = {
        Bucket: 'lendi-secops-test',
        Key: `${userId}.jpg`
    }

    const {Body: object} = await s3.getObject(params).promise();
    return object;
}
