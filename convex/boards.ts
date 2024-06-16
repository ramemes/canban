import { query } from "./_generated/server";
import { v } from "convex/values";



export const getUserBoards = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || identity.subject !== args.authorId) {
      throw new Error("Unauthorized");
    }



    const boards = await ctx.db
      .query("boards")
      .withIndex("by_author_id", (q) =>
        q
          .eq("authorId", args.authorId)
      )
    .order("desc")
    .collect();

    return boards
  }
})