import express, { Express } from 'express'
import type http from "http"

import type { Config } from "../config/types"
import logger from "../utils/Logger"
import WebServer from "./WebServer"

class Bootstrap {
  private webServer?: http.Server

  constructor(
    private readonly config: Config
  ) {
  }

  startWebServer(): Express {
    const app = express()
    this.webServer = app.listen(this.config.httpPort, () => {
      logger.info({ EventType: 'WebServerStarted' })
    })
    process.on('SIGTERM', () => this.terminate())
    process.on('SIGINT', () => this.terminate())
    new WebServer(app).start()
    return app
  }

  private terminate(): void {
    this.webServer?.close()
    logger.info({ EventType: 'WebServerTerminated' })
  }
}

export default Bootstrap