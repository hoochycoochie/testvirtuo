"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../../utils/db");
var station_service_1 = require("../../services/station.service");
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, db_1.Db.connect()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
//afterEach(async () => await Db.clearDatabase());
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.Db.clearDatabase()];
            case 1:
                _a.sent();
                return [4 /*yield*/, db_1.Db.closeDatabase()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Station service ', function () {
    var stationData = {
        name: 'iPhone 11',
    };
    var station = null;
    var stationService = new station_service_1.StationService();
    it('can be created correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stationService.save(stationData)];
                case 1:
                    station = _a.sent();
                    expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, station];
                    }); }); }).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can read Station by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var stationFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stationService.read(station._id)];
                case 1:
                    stationFound = _a.sent();
                    expect(stationFound._id).toEqual(station._id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can update Station', function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, stationUpdated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { name: 'toto1' };
                    return [4 /*yield*/, stationService.update(station._id, data)];
                case 1:
                    stationUpdated = _a.sent();
                    expect(stationUpdated.name).toEqual(data.name);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can find list of Stations', function () { return __awaiter(void 0, void 0, void 0, function () {
        var stations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stationService.find()];
                case 1:
                    stations = _a.sent();
                    expect(stations.docs).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it("can be removed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var removedStation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stationService.remove(station._id)];
                case 1:
                    removedStation = _a.sent();
                    expect(removedStation.deletedCount).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('name should be at least 3 characters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, stationService.save({ name: 'a' })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1).toBeDefined();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('name should be unique at least 3 characters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, stationService.save({ name: 'abcd' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, stationService.save({ name: 'abcd' })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    expect(error_2).toBeDefined();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
