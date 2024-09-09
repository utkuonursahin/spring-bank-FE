"use client"

import {z} from "zod"

const registerFormSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    ssn: z.string().min(12).max(12),
    password: z.string().min(12)
})

export default registerFormSchema
