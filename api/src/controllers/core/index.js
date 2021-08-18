const Server = require('./server');
const DB = require('./db');
const HttpStatusCodes = require('http-status-codes');

let $core;

module.exports = class Core {
    #_reqReceiver;
    #_server;
    #_database;

    get server() {
        return this.#_server
    }
    get database() {
        return this.#_database
    }

    static singleton() {
        if (!$core) $core = new Core();
        return $core;
    }

    constructor() {
    }
    init = async (options, reqReceiver) => {
        if (!this.#_server) {
            this.#_reqReceiver = reqReceiver;
            this.#_server = new Server();
            this.#_server.run(options.server, {
                ...this.events.server,
                onError: this.onError
            });
        }
        if (!this.#_database) {
            this.#_database = new DB();
            try {
                await this.#_database.create(options.db)
            } catch (error) {
                this.onError(error)
            }
        }
    }
    destructor = (error) => {
        this.#_server = null;
        this.#_database = null;
        error && console.error("Core([ error ])", error.toString());
    }
    events = {
        server: {
            onReady: () => {
                return console.info("Core() events.server.onReady()");
            },
            onRequest: (req, res) => {

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
                res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

                return this.#_reqReceiver({req, res});
            }
        }
    }
    onError = (error) => {
        return this.destructor(error);
    }
}
