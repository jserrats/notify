import mqtt from "mqtt";
import { BASE_TOPIC, STATUS_TOPIC } from "./topics";
import { Router } from "./router"

export function initMqtt(router: Router) {
    const MQTT_SERVER = process.env.MQTT_SERVER;
    if (MQTT_SERVER === undefined) {
        throw new Error("[!] Missing MQTT_SERVER")
    } else {
        MQTT_SERVER as string
    }

    var client = mqtt.connect("mqtt://" + MQTT_SERVER, {
        will: { topic: STATUS_TOPIC, payload: Buffer.from("offline") }
    });

    client.on("connect", () => {
        client.subscribe(BASE_TOPIC + "#", (err) => {
            if (!err) {
                client.publish(STATUS_TOPIC, "online");
            }
        });
    });

    client.on("message", (topic, message) => {
        router.route(topic, message.toString())
    });

    return client
}
