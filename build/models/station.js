"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var stationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        trim: true,
    },
    cars: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'cars', default: [] }],
});
stationSchema.plugin(mongoose_paginate_v2_1.default);
var Station = mongoose_1.default.model('stations', stationSchema);
exports.default = Station;
