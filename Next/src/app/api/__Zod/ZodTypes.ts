import {z} from 'zod';
const SignUpSchema = z.object({
    username: z.string().min(5),
})