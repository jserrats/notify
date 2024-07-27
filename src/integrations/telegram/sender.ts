import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'
import { TelegramRecipients } from "mqtt-assistant/src/components/telegram/types"

class TelegramSender {
    private instance: AxiosInstance;
    private recipients: Record<TelegramRecipients, string>

    constructor() {

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        if (TELEGRAM_BOT_TOKEN === undefined) {
            throw new Error("[!] Missing TELEGRAM_BOT_TOKEN")
        }

        this.recipients = {
            "admin": process.env.TELEGRAM_ADMIN_ID as string,
            "user": process.env.TELEGRAM_USER_ID as string,
            "home": ""
        }

        this.instance = axios.create({
            baseURL: 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN,
            timeout: 1000,
        });

    }

    // https://core.telegram.org/bots/api#sendmessage

    public sendMessage(message: string, options?: Options) {

        let recipientID: string;

        if (options?.recipient !== undefined) {
            recipientID = this.recipients[options.recipient]
        } else {
            recipientID = this.recipients["admin"]

        }

        this.instance.post('/sendMessage', {
            chat_id: recipientID,
            text: message,
            parse_mode: "MarkdownV2"
        })

        console.log(message)
    }
}

export const sender = new TelegramSender()

type Options = {
    markdown?: boolean,
    recipient?: TelegramRecipients
}