const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME, OBJECT_NAME } = require('dotenv-safe').config().parsed

const AWS = require('aws-sdk')

AWS.config.credentials = new AWS.Credentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY)

const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'eu-central-1' })

const params = {
  Bucket:  BUCKET_NAME,
  Key:     OBJECT_NAME,
  Expires: process.env.EXPIRE_AFTER || 10
}

const url = s3.getSignedUrl('getObject', params)

console.info(url)
