'use client';

import { z } from 'zod';

const registerFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    ssn: z.string().min(12).max(12),
    password: z.string().min(8)
});

export default registerFormSchema;
