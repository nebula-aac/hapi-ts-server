import { ResponseToolkit, Server } from "@hapi/hapi"

const init = async () => {
    const server: Server = new Server({
        port: 8082,
        host: 'locahost'
    })

    server.route({
        method: "GET",
        path: "/",
        handler: (request: Request, h: ResponseToolkit) => {
            return h.response(`Welcome to the cloud!`).code(200)
        }
    })

    server.route({
        method: "GET",
        path: "/persons/{name}",
        handler: function (request, h) {
            const name = request.params.name ? request.params.name : "stranger"

            if (request.params.name) {
                return h.response(`Welcome to the cloud, ${name}!`).code(200)
            } else {
                return h.response(`Your name is required, stranger.`).code(400)
            }
        }
    })

    server.route({
        method: "GET",
        path: "/persons/",
        handler: function (request, h) {
            return request.query
        }
    })

    server.route({
        method: "POST",
        path: "/persons",
        handler: (request, h) => {
            // @TODO
        }
    })

    await server.start()
    console.log("Server is running on %s", server.info.uri)
}

init()