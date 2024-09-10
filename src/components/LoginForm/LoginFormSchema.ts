'use client';

import { z } from 'zod';

const loginFormSchema = z.object({
    ssn: z.string().min(12).max(12),
    password: z.string().min(12)
});

export default loginFormSchema;
