import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCardsByListId } from "./listsHelpers";

export const getCards = query({
  args: {
    listId: v.id("lists")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const cards = await getCardsByListId(ctx, args.listId)
    const orderedLists = cards.sort((a,b) => a.index - b.index)

    return orderedLists
  }
})

export const reorderCards = mutation({
  args: {
    listId: v.id("lists"),
    reorderedCardIds: v.array(v.id("cards")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const reorderedCardsPromise = args.reorderedCardIds.map((cardId, index) => {
      return ctx.db.patch(cardId, {index})
    })
    await Promise.all(reorderedCardsPromise)

  }
})
