import * as z from "zod";
export const threadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum of 3 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(3, { message: "Minimum of 3 characters" }),
});
