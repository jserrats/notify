import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'
import { TelegramMessage } from "mqtt-assistant/src/components/telegram/types"

class TelegramSender {
    private instance: AxiosInstance;
    private adminUserID: string;

    constructor() {

        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        if (TELEGRAM_BOT_TOKEN === undefined) {
            throw new Error("[!] Missing TELEGRAM_BOT_TOKEN")
        }

        this.adminUserID = process.env.TELEGRAM_USER_ID as string
        this.instance = axios.create({
            baseURL: 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN,
            timeout: 1000,
        });

    }

    // https://core.telegram.org/bots/api#sendmessage

    public sendMessage(message: string, options?: Options) {

        // TODO: implement options
        this.instance.post('/sendMessage', {
            chat_id: this.adminUserID,
            text: message,
            parse_mode: "MarkdownV2"
        })

        console.log(message)
    }
}

export const sender = new TelegramSender()

type Options = {
    markdown?: boolean,
} & Pick<TelegramMessage, 'recipient'>