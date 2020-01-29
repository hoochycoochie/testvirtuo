"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express_1.default();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    App.prototype.listen = function () {
        this.app.listen("3001", function () {
            console.log("App listening on the port " + process.env.PORT);
        });
    };
    App.prototype.getServer = function () {
        return this.app;
    };
    App.prototype.initializeMiddlewares = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    };
    App.prototype.initializeErrorHandling = function () {
        this.app.use(error_middleware_1.default);
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/api', controller.router);
        });
    };
    return App;
}());
exports.default = App;
