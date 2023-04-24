import type { Config } from './config/types'
import Bootstrap from './main/Bootstrap'

process.env.NODE_CONFIG_DIR = `${__dirname}/config`
const config = require('config').util.toObject() as Config

const app = new Bootstrap(config).startWebServer()

export default app