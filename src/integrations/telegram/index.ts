import 'dotenv/config'
import { Router } from '../../router';
import { sender } from "./sender"
import { TelegramLog } from "./handlers"

export class Telegram extends Router {

  constructor(topic: string) {
    super(topic)

    const loggers = [
      new TelegramLog("debug"),
      new TelegramLog("info"),
      new TelegramLog("warning"),
      new TelegramLog("error")
    ]

    loggers.forEach((logger) => { this.addRoute({ topic: logger.topic, action: logger }) })
  }

  route(topic: string, payload: string): void {
    // root topic
    if (topic === "") {
      sender.sendMessage(payload)
    } else {
      super.route(topic, payload)
    }
  }
}

