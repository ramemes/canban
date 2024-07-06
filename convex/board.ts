import { mutation, query } from "./_generated/server";

import { v } from "convex/values";
import { imgFromPublic } from "../utils/utils";
import { getListsWithCards } from "./listsHelpers";



export const createBoard = mutation({
  args: {
    title: v.string(),
    response: v.optional(v.string()),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    console.log(identity)
    const randomImage = imgFromPublic();

    const boardId = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "User",
      imageUrl: randomImage
    })

    if (args.response) {
      const responseObj = JSON.parse(args.response)
      let count = -1

      for (const category of responseObj.categories) {
        const listId = await ctx.db.insert("lists", {
          boardId: boardId,
          title: category.title,
          color: "000000",
          index: ++count
        })
        let cardCount = -1

        const cardPromises = category.steps.map((step: any) => {
          return ctx.db.insert("cards", {
            listId: listId,
            title: step,
            description: "card description here",
            color: "000000",
            index: ++cardCount
          })
        })

        await Promise.all(cardPromises)
      }
    }

    return boardId
  }
})


export const getBoardListsCards = query({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized");
    }
    console.log(identity)
    const board = await ctx.db.get(args.boardId)

    if (!board) {
      throw new Error("Board not found")
    }
    

    // if (identity.familyName !== board.orgId) {
    //   throw new Error("Unauthorized")
    // }

    const lists = await getListsWithCards(ctx, args.boardId)
  
    return {...board, lists}
    

  }
})




export const get = query({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.boardId)

    if (!board) {
      throw new Error("Board not found")
    }

    if (identity.subject !== board.authorId) {
      throw new Error("Unauthorized")
    }
    

    return board
  }
})

export const editBoardTitle = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    
    const updatedBoard = await ctx.db.patch(args.id, {
      title: args.title
    })

    return updatedBoard
  }
})

export const deleteBoard = mutation({
  args: {
    id: v.id("boards")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    if (identity.subject !== board.authorId) {
      throw new Error("Unauthorized");
    }

    const lists = await ctx.db.query("lists")
      .withIndex("by_board", (q) => 
        q.eq("boardId", args.id)
      )
      .order("desc")
      .collect();

    for (const list of lists) {
      const cards = await ctx.db.query("cards")
        .withIndex("by_list", (q) => 
          q.eq("listId", list._id)
        )
        .order("asc")
        .collect();

      const deleteCardsPromises = cards.map(card => ctx.db.delete(card._id));
      await Promise.all(deleteCardsPromises);

      await ctx.db.delete(list._id);
    }

    return await ctx.db.delete(args.id);

  }
});
