import winston from 'winston'

const winstonLogger = winston.createLogger({
  format: winston.format.json(),
  transports: new winston.transports.Console()
})

export default winstonLogger