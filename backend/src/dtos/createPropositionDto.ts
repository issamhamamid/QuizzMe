import {z} from 'zod'

export const createPropositionSchema = z.object({
    id : z.number().optional(),
    content : z.string()

})


export type CreatePropositionDto = z.infer<typeof createPropositionSchema>