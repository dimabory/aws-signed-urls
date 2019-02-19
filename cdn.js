const { KEY_PAIR_ID, PRIVATE_KEY_PATH, BUCKET_URL, OBJECT_NAME } = require('dotenv-safe').config().parsed

const fs  = require('fs')
const AWS = require('aws-sdk')

const privateKey = fs.readFileSync(PRIVATE_KEY_PATH)

const signer = new AWS.CloudFront.Signer(KEY_PAIR_ID, privateKey)

const url = signer.getSignedUrl({
  url:     `${BUCKET_URL}/${OBJECT_NAME}`,
  expires: process.env.EXPIRE_AT || Date.now() + 50
})

console.info(url)

