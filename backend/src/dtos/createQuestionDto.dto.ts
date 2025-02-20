import {z} from 'zod'
import {createPropositionSchema} from "./createPropositionDto";


const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type && issue.received === "undefined") {
        switch (issue.path[0]) {
            case "content":
                return { message: "question Content  is required" };
            case "answer":
                return { message: "Question answer is required" };
            case "media_url":
                return { message: "Question media url is required" };
            case "propositions":
                return { message: "Question propositions are required" };
            default:
                return { message: ctx.defaultError };
        }
    }
    return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const createQuestionSchema = z.object({
    id : z.number().optional() ,
    content : z.string().nonempty() ,
    answer :z.string() ,
    media_url : z.string().url(),
    type : z.string(),
    propositions : z.array(createPropositionSchema).min(4 , "Please insert at least four propositions")
}).strict()


export type  CreateQuestionDto = z.infer<typeof createQuestionSchema>