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
const router = express_1.default.Router();
const signUpSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(7).max(20).email(),
    password: zod_1.z.string().min(5, "Password must be atleast of length 5").max(20),
    confirmPassword: zod_1.z.string().min(5).max(20),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const result = signUpSchema.safeParse(body);
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
        });
    }
    res.json(Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true });
}));
// router.post('/signup', async(req,res)=> {
//     try{
//         const parsedInput= signupInput.safeParse(req.body);
//         if(!parsedInput.success){
//             return res.status(411).json({
//                 msg: parsedInput.error
//             })
//         }
//         const username= parsedInput.data.username;
//         const password= parsedInput.data.password;
//         const user= await User.findOne({username: username})
//         if(user){
//            return  res.json({message: 'user already exists!'})
//         }else{
//             const newUser= new User({username,password});
//             await newUser.save();
//             if(!process.env.SECRET_KEY){
//                 return res.sendStatus(403);
//             }
//             const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
//             res.json({message: "SignedUp successfully", token})
//         }
//     }catch(err){
//         console.log(err);
//     }
// });
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield user_1.User.findOne({ username: username });
        if (user) {
            if (!process.env.SECRET_KEY) {
                return res.sendStatus(403);
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.json({ message: "Logged in successfully", token });
        }
        else {
            return res.json({ message: "User does not exists" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/me", verifyJwt_1.verifyJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// Output of const result= signUpSchema.safeParse(body); is written down :-
// {
//     "msg": {
//         "success": false,
//         "error": {
//             "issues": [
//                 {
//                     "code": "invalid_type",
//                     "expected": "string",
//                     "received": "undefined",
//                     "path": [
//                         "username"
//                     ],
//                     "message": "Required"
//                 },
//                 {
//                     "code": "too_small",
//                     "minimum": 5,
//                     "type": "string",
//                     "inclusive": true,
//                     "exact": false,
//                     "message": "String must contain at least 5 character(s)",
//                     "path": [
//                         "password"
//                     ]
//                 }
//             ],
//             "name": "ZodError"
//         }
//     }
// }
