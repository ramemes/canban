import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createCard = mutation({
  args: {
    listId: v.id("lists"),
    title: v.string(),
    description: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const card = await ctx.db.insert("cards", {
      listId: args.listId,
      title: args.title,
      description: args.description,
      color: args.color,
    })

    return card
  }
})

export const deleteCard = mutation({
  args: {
    cardId: v.id("cards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const card = await ctx.db.delete(args.cardId)

    return card
  }
})