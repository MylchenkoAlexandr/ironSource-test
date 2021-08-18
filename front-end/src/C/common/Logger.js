class Logger {
    clear = console.clear;

    constructor(enabled = false) {
        this._enabled = enabled;
    }

    output = (level = "log", text, color, ...variables) => {
        this._enabled && console.log("%c" + text, `color: ${color};`, ...variables);
    }
    error = (name, text, ...variables) => {
        const color = "#ff2754";
        this.output("error", `${name || ""} ${text || ""}`, color, ...variables);
    }
    warn = (name, text, ...variables) => {
        const color = "#ff9a00";
        this.output("warn", `${name || ""} ${text || ""}`, color, ...variables);
    }
    info = (name, text, ...variables) => {
        const color = "#00ecff";
        this.output("info", `${name || ""} ${text || ""}`, color, ...variables);
    }
    log = (name, text, ...variables) => {
        const color = "#edf7ff";
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    success = (name, text, ...variables) => {
        const color = "#2aff00";
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    debug = (name, text, ...variables) => {
        const color = "#ff00bb";
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
}

export default new Logger(true);