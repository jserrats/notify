import wcmatch from 'wildcard-match'

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
            if (wcmatch(route.topic as string)(topic.split("/")[1])) {
                route.action.route(topic.substring(0, this.topic.length), payload)
            }
        })
    }
}


type Route = {
    topic: string[] | string,
    action: Router
}