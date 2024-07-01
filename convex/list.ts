import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getListsByBoardId } from "./listsHelpers";

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

    const lists = await ctx.db.query("lists")
      .withIndex("by_board", (q) =>
        q.eq("boardId", args.boardId)
      )
      .collect()

    const listsLength = lists.length  

    const list = await ctx.db.insert("lists", {
      boardId: args.boardId,
      title: args.title,
      color: args.color,
      index: listsLength
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

    const list = await ctx.db.get(args.id)

    if (!list) return;



    const cards = await ctx.db.query("cards")
    .withIndex("by_list", (q) => 
      q.eq("listId", args.id)
    )
    .order("asc")
    .collect();

    const deleteCardsPromises = cards.map(card => ctx.db.delete(card._id));
    await Promise.all(deleteCardsPromises);

    const deletedList = await ctx.db.delete(args.id);

    const lists = await getListsByBoardId(ctx, list.boardId)
    const orderedLists = lists.sort((a,b) => a.index - b.index)

    const reIndexedListsPromises = orderedLists.map((list,index) => ctx.db.patch(list._id,{
      index: index
    }))

    await Promise.all(reIndexedListsPromises);


    return deletedList
  }
})


