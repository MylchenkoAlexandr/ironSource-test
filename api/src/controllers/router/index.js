const Url = require("url");
const {has, isEmpty, get} = require("lodash");
const HttpStatusCodes = require("http-status-codes");
const {HttpHeaders} = require("../../constants");
const Utils = require("../../utils");

module.exports = class Router {

    #_routes;
    bodyParsers = {
        get: async (req) => {
            const parse = Url.parse(req.url, true);
            const {pathname: path, query: data} = parse;

            return Promise.resolve({path: path.toLowerCase(), data});
        },
        post: async (req) => new Promise((resolve) => {
            let body = "",
                data = null;

            const parse = Url.parse(req.url, true);
            const {pathname: path} = parse;

            req.on('data', (payload) => {
                body += payload
            });
            req.on('end', () => {
                !Utils.isJSON(body)
                    ? data = body
                    : data = JSON.parse(body);

                return resolve({path: path.toLowerCase(), data});
            });
        })
    }

    constructor(routes) {
        this.#_routes = routes;
    }
    factory = async ({req, res}) => {
        const method = req.method.toLowerCase();
        if (!this.bodyParsers.hasOwnProperty(method)) {
            const {message} = new Error("Unsupported request method type");
            res.writeHead(HttpStatusCodes.BAD_REQUEST, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            res.end(message);

            return console.error("Router([ error ])", message);
        }

        const bodyParsers = this.bodyParsers[method];
        const body = await bodyParsers(req);
        const isBodyEmpty = isEmpty(body);

        if (isBodyEmpty) {
            const error = new Error("Cannot parse body");
            res.writeHead(HttpStatusCodes.FORBIDDEN, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            res.end(error.message);
            return console.error("Router([ error ])", error.toString());
        }

        const controllerPath = `${method}.${body.path}`;
        const isRouteFound = has(this.#_routes, controllerPath);

        if (!isRouteFound) {
            const error = new Error("Route not found");
            res.writeHead(HttpStatusCodes.NOT_FOUND, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            res.end(error.message);

            return console.error("Router([ error ])", error.toString());
        }

        const route = get(this.#_routes, controllerPath);
        return route(body, req, res);
    }
}