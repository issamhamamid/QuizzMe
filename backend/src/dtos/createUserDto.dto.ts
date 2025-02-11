import { z } from 'zod'

// Custom error map to handle all validation scenarios
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type && issue.received === "undefined") {
        switch (issue.path[0]) {
            case "username":
                return { message: "Username is required" };
            case "email":
                return { message: "Email is required" };
            case "full_name":
                return { message: "Full name is required" };
            case "password":
                return { message: "Password is required" };
            default:
                return { message: ctx.defaultError };
        }
    }
    return { message: ctx.defaultError };
};

// Set the custom error map
z.setErrorMap(customErrorMap);

const RoleEnum = z
    .enum(['user', 'admin'], {
        errorMap: () => ({ message: "Role must be 'user' or 'admin'" })
    });

export const createUserSchema = z.object({
    id: z.number().optional(),

    username: z.string()
        .min(4, "Username must be at least 4 characters long")
        .max(10, "Username is too long"),

    email: z.string()
        .email("Invalid Email Address"),

    full_name: z.string(),

    password: z.string()
        .min(4, "Password must be at least 4 characters long"),

    role: RoleEnum.optional()
}).strict();

export type createUserDto = z.infer<typeof createUserSchema>;