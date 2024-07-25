import { Router } from "../../router"
import { LogLevel, TelegramMessage } from "mqtt-assistant/src/components/telegram/types"
import { sender } from "./sender"

export class TelegramLog extends Router {

    static icons = {
        "debug": "🧪",
        "info": "ℹ️",
        "warning": "⚠️",
        "error": "🔴"
    }

    constructor(topic: LogLevel) {
        super(topic)
    }

    public route(topic: string, message: string) {

        try {
            const messageObject = JSON.parse(message) as TelegramMessage
            let text: string = `${TelegramLog.icons[this.topic as LogLevel]} *${this.topic.toUpperCase()}:* `

            if (messageObject.title !== undefined) {
                text = `${text} *${messageObject.title}*\n`
            }

            text = text + messageObject.message
            sender.sendMessage(text, { recipient: messageObject.recipient })

        } catch {
            sender.sendMessage(message)
        }
    }
}


export class TelegramStatus extends Router {

    static icons = {
        "off": "🔴",
        "on": "🟢",
    }

    constructor(topic: OnOff) {
        super(topic)
        this.topic = topic
    }

    public route(topic: string, message: string) {

        try {
            const messageObject = JSON.parse(message) as TelegramMessage
            let text: string = `${TelegramStatus.icons[this.topic as OnOff]} *${this.topic.toUpperCase()}:* `

            if (messageObject.title !== undefined) {
                text = `${text} *${messageObject.title}*\n`
            }

            text = text + messageObject.message
            sender.sendMessage(text)

        } catch {
            sender.sendMessage(message)
        }
    }
}

type OnOff = "off" | "on"
