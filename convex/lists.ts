import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCardsByListId, getListsByBoardId } from "./listsHelpers";

export const getLists = query({
  args: {
    boardId: v.id("boards")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const lists = await getListsByBoardId(ctx, args.boardId)

    const orderedLists = lists.sort((a,b) => a.index - b.index)
  
    const cardsPromises = orderedLists.map((list) => {
      return getCardsByListId(ctx, list._id)
    })

    const newCards =  await Promise.all(cardsPromises)
  

    const listsWithCards = orderedLists.map((list, index) => {
      return {...list, cards: newCards[index].sort((a,b) => a.index - b.index)}
    })
  
    return listsWithCards
  }
})

export const reorderLists = mutation({
  args: {
    boardId: v.id("boards"),
    reorderedListIds: v.array(v.id("lists")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const reorderListsPromise = args.reorderedListIds.map((listId, index) => {
      return ctx.db.patch(listId, {index})
    })
    await Promise.all(reorderListsPromise)

  }
})

