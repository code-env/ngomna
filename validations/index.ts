import * as z from 'zod';

const validString = z.string().trim();

export const licenceSchema = z.object({
  name: validString,
  url: validString,
});

export type LicenseType = z.infer<typeof licenceSchema>;
