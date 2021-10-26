const path = require('path')
const dotenv = require('dotenv')
module.exports = () => {
  let { NODE_ENV } = process.env
  dotenv.config({
    path: path.join(__dirname, '../', NODE_ENV === 'production' ? '.env.pro' : '.env.dev')
  })
}