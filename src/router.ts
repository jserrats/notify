import wcmatch from 'wildcard-match'
import { telegram } from 'mqtt-assistant'
export class Router {
    private routes: Route[] = []
    topic: string

    constructor(topic: string) {
        this.topic = topic
    }

    addRoute(route: Route) {
        if (Array.isArray(route.topic)) {
            route.topic.forEach((topicInArray) => {
                this.routes.push({ topic: topicInArray, action: route.action })
            })
        } else {
            this.routes.push(route)
        }
    }

    route(topic: string, payload: string) {
        this.routes.forEach((route) => {
            if (wcmatch(route.topic as string)(topic.split("/")[0])) {
                try {
                    route.action.route(topic.split("/").slice(1).join("/")
                        , payload)
                } catch (error) {
                    if (error instanceof Error) {
                        telegram.error(error)
                    }
                }

            }
        })
    }
}


type Route = {
    topic: string[] | string,
    action: Router
}