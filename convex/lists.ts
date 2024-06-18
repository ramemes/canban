import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLists = query({
  args: {
    boardId: v.id("boards")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const lists = await ctx.db.query("lists")
      .withIndex("by_board", (q) => 
        q
          .eq("boardId", args.boardId)
      )
      .order("desc")
      .collect()
    

    return lists
  }
})

