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
const dikshakk_1 = require("dikshakk");
const router = express_1.default.Router();
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
        //console.log("puppu");
        console.log(err);
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield req.body;
    const result = dikshakk_1.signUpSchema.safeParse(body);
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
        });
        res.json(Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { success: true });
    }
    if ('data' in result) {
        const username = result.data.username;
        const password = result.data.password;
        const confirmPassword = result.data.confirmPassword;
        try {
            if (password === confirmPassword) {
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
        }
        catch (err) {
            res.status(403).json(err);
        }
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = dikshakk_1.signInSchema.safeParse(req.body);
        if (!parseResult.success) {
            let zodErrors = {};
            parseResult.error.issues.forEach((issue) => {
                zodErrors = Object.assign(Object.assign({}, zodErrors), { [issue.path[0]]: issue.message });
            });
            res.json(Object.keys(zodErrors).length > 0 ?
                { errors: zodErrors }
                : { success: true });
        }
        else {
            const username = parseResult.data.username;
            const password = parseResult.data.password;
            const user = yield user_1.User.findOne({ username, password });
            if (user) {
                if (!process.env.SECRET_KEY) {
                    return res.sendStatus(403);
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                res.json({ message: "SignedIn successfully", token });
            }
            else {
                res.json({ message: "User not regiseted, Signup to login!" });
            }
        }
    }
    catch (err) {
        res.status(403).json(err);
    }
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
// router.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;
//     const user = await User.findOne({ username: username });
//     if (user) {
//       if (!process.env.SECRET_KEY) {
//         return res.sendStatus(403);
//       }
//       const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//         expiresIn: "1h",
//       });
//       return res.json({ message: "Logged in successfully", token });
//     } else {
//       return res.json({ message: "User does not exists" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
exports.default = router;
// Output of const result= signUpSchema.safeParse(body) if contains data inside req not expected as zod validation in the server, the error thrown by zod is written below :-
// {
//  
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
//If no error by zod validation from data recieved from client inside req to the server, so zod gives output for result= signUpSchema.safeParse(body) is->
// {
//   success: true,
//   data: {
//     username: 'ddikshakk@gmail.com',
//     password: '123456',
//     confirmPassword: '123456'
//   }
// }
