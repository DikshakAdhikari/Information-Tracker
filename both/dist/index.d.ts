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
export type TsignUpSchema = z.infer<typeof signUpSchema>;
