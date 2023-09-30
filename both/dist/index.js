"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(7).max(20).email(),
    password: zod_1.z.string().min(5, "Password must be atleast of length 5").max(20),
    confirmPassword: zod_1.z.string().min(5).max(20),
}).refine((data) => data.password === data.confirmPassword, { message: "Password don't match", path: ["confirmPassword"], });
