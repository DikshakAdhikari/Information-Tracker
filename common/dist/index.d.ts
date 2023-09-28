import { z } from "zod";
export declare const signUpSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    confirmPassword: string;
}>, {
    email: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    confirmPassword: string;
}>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
