import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCards = query({
  args: {
    listId: v.id("lists")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const cards = await ctx.db.query("cards")
      .withIndex("by_list", (q) => 
        q
          .eq("listId", args.listId)
      )
      .order("desc")
      .collect()
    

    return cards
  }
})

