import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'
import { BASE_TOPIC, STATUS_TOPIC } from '../../topics'
import mqtt from "mqtt";
import { Router } from '../../router';


export class Telegram extends Router {
  private instance: AxiosInstance;
  private adminUserID: string;

  constructor(topic: string) {
    super(topic)
    
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

  public route(topic: string, message: string) {
    this.sendMessage(message.toString())
  }

  // https://core.telegram.org/bots/api#sendmessage
  private sendMessage(message: string) {
    this.instance.post('/sendMessage', {
      chat_id: this.adminUserID,
      text: message
    })

  }
}

