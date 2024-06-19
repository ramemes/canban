import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createList = mutation({
  args: {
    boardId: v.id("boards"),
    title: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const list = await ctx.db.insert("lists", {
      boardId: args.boardId,
      title: args.title,
      color: args.color,
    })

    return list
  }
})