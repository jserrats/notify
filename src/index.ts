import 'dotenv/config'
import { Telegram } from "./integrations/telegram";
import { initMqtt } from "./mqtt"
import { Router } from './router';
import { TelegramMessage } from "mqtt-assistant/src/components/telegram/types"

var rootRouter = new Router("notify");
const telegram = new Telegram("telegram")

rootRouter.addRoute({ topic: telegram.topic, action: telegram })
initMqtt(rootRouter)

rootRouter.route("telegram/info", JSON.stringify({ message: "Started notify" } as TelegramMessage))

