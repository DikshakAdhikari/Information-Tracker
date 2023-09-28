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
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt_1 = require("../middleware/verifyJwt");
const zod_1 = require("zod");
const types_1 = require("./../../client/src/components/lib/types");
let signupInput = zod_1.z.object({
    username: zod_1.z.string().min(5).max(20).email(),
    password: zod_1.z.string().min(5).max(12)
});
const router = express_1.default.Router();
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    console.log(body);
    const result = types_1.signUpSchema.safeParse(body);
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
        });
    }
    return res.json(Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedInput = signupInput.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(411).json({
                msg: parsedInput.error
            });
        }
        const username = parsedInput.data.username;
        const password = parsedInput.data.password;
        const user = yield user_1.User.findOne({ username: username });
        if (user) {
            return res.json({ message: 'user already exists!' });
        }
        else {
            const newUser = new user_1.User({ username, password });
            yield newUser.save();
            if (!process.env.SECRET_KEY) {
                return res.sendStatus(403);
            }
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: "SignedUp successfully", token });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield user_1.User.findOne({ username: username });
        if (user) {
            if (!process.env.SECRET_KEY) {
                return res.sendStatus(403);
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.json({ message: 'Logged in successfully', token });
        }
        else {
            return res.json({ message: 'User does not exists' });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/me', verifyJwt_1.verifyJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["userId"];
        const user = yield user_1.User.findById(userId);
        if (!user) {
            return res.sendStatus(403);
        }
        const username = user.username;
        res.json(username);
    }
    catch (err) {
        console.log("puppu");
        console.log(err);
    }
}));
exports.default = router;
