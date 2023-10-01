import { z } from 'zod';
export declare const signUpSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    confirmPassword: string;
}, {
    username: string;
    password: string;
    confirmPassword: string;
}>, {
    username: string;
    password: string;
    confirmPassword: string;
}, {
    username: string;
    password: string;
    confirmPassword: string;
}>;
export declare const signInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type TsignUpSchema = z.infer<typeof signUpSchema>;
export type TsignInSchema = z.infer<typeof signInSchema>;
