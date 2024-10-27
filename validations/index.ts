import * as z from "zod";

const validString = z.string().trim();

export const licenceSchema = z.object({
  cardId: validString,
  status: validString,
});

export type LicenseType = z.infer<typeof licenceSchema>;
