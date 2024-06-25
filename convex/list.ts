import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createList = mutation({
  args: {
    boardId: v.id("boards"),
    title: v.string(),
    color: v.string(),
    index: v.number(),
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
      index: args.index
    })

    return list
  }
})

export const reorderList = mutation({
  args: {
    boardId: v.id("boards"),
    title: v.string(),
    color: v.string(),
    index: v.number(),
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
      index: args.index
    })

    return list
  }
})

export const editListTitle = mutation({
  args: {
    id: v.id("lists"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const updatedList = await ctx.db.patch(args.id, {
      title: args.title
    })

    return updatedList
  }
})

export const deleteList = mutation({
  args: {
    id: v.id("lists")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const cards = await ctx.db.query("cards")
    .withIndex("by_list", (q) => 
      q.eq("listId", args.id)
    )
    .order("asc")
    .collect();

    const deleteCardsPromises = cards.map(card => ctx.db.delete(card._id));
    await Promise.all(deleteCardsPromises);

    return await ctx.db.delete(args.id);
  }
})