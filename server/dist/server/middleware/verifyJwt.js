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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.headers.authorization;
        //  console.log(data);
        if (data) {
            const token = data.split(" ")[1];
            //console.log(token);
            if (!process.env.SECRET_KEY) {
                return res.sendStatus(403);
            }
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, payload) => {
                if (err) {
                    return res.status(400).json(`damnnnnnnn ${err}`);
                }
                if (!payload) {
                    return res.sendStatus(403);
                }
                if (typeof payload === "string") {
                    return res.sendStatus(403);
                }
                req.headers["userId"] = payload.id;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.verifyJwt = verifyJwt;
