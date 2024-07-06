import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCardsByListId } from "./listsHelpers";

export const createCard = mutation({
  args: {
    listId: v.id("lists"),
    title: v.string(),
    description: v.string(),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const listLength = (await ctx.db
      .query("cards")
      .withIndex("by_list", (q) => q.eq("listId", args.listId))
      .collect()).length


    const defaultColor = "000000"

    const card = await ctx.db.insert("cards", {
      listId: args.listId,
      title: args.title,
      description: args.description,
      color: defaultColor,
      index: listLength
    })

    return card
  }
})

export const editCard = mutation({
  args: {
    id: v.id("cards"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
     
    const patchObj: any = {}

 
    if (args.title) {
      patchObj.title = args.title
    }
    if (args.description) {
      patchObj.description = args.description
    }
    

    const editedCard = await ctx.db.patch(args.id, {
      ...patchObj
    })

    return editedCard
  }
})

export const deleteCard = mutation({
  args: {
    id: v.id("cards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const card = await ctx.db.get(args.id)

    if (!card) return;

    const deletedCard = await ctx.db.delete(args.id)

    const cards = await getCardsByListId(ctx, card.listId)
    const orderedCards = cards.sort((a,b) => a.index - b.index)

    const reIndexedCardsPromises = orderedCards.map((card,index) => ctx.db.patch(card._id,{
      index: index
    }))

    await Promise.all(reIndexedCardsPromises)

    return deletedCard
  }
})