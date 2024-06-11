import 'dotenv/config'
import { Telegram } from "./integrations/telegram";
import { initMqtt } from "./mqtt"
import { Router } from './router';

var rootRouter = new Router("notify");
const telegram = new Telegram("telegram")

rootRouter.addRoute({ topic: telegram.topic , action: telegram })
initMqtt(rootRouter)

console.log("[i] Started notify")

