const http = require('http');

module.exports = class Server {
    #_server;
    #_options;
    #_events;

    constructor() {
    }

    run = (options, {onReady, onRequest, onError}) => {

        this.#_options = options;
        this.#_events = {onReady, onRequest, onError};

        const {port} = this.#_options;

        try {
            this.#_server = http.createServer(this.#_events.onRequest);
            this.#_server.listen(port, this.onListening);
        } catch (error) {
            this.#_events.onError(error)
        }
    }
    onListening = (error) => {
        !error
            ? this.#_events.onReady()
            : this.#_events.onError(error);
    }
}