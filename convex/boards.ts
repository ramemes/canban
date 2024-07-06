import { query } from "./_generated/server";
import { v } from "convex/values";



export const getUserBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
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
          .eq("orgId", args.orgId)
      )
      .collect();

    } else {
        boards = await ctx.db
        .query("boards")
        .withIndex("by_org_id", (q) =>
          q
            .eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();
    }



    return boards
  }
})