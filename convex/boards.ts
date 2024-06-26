import { query } from "./_generated/server";
import { v } from "convex/values";



export const getUserBoards = query({
  args: {
    authorId: v.string(),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || identity.subject !== args.authorId) {
      throw new Error("Unauthorized");
    }

    const title = args.search as string;
    let boards = []

    if (title) {
      boards = await ctx.db
      .query("boards")
      .withSearchIndex("search_title", (q) => 
        q
          .search("title", title)
          .eq("authorId", args.authorId)
      )
      .collect();

    } else {
        boards = await ctx.db
        .query("boards")
        .withIndex("by_author_id", (q) =>
          q
            .eq("authorId", args.authorId)
        )
        .order("desc")
        .collect();
    }



    return boards
  }
})