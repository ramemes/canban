import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { imgFromPublic } from "../utils/utils"

export const createBoard = mutation({
  args: {
    authorId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();


    if (!identity || identity.subject !== args.authorId) {
      throw new Error("Unauthorized");
    }

    const randomImage = imgFromPublic()

    const board = await ctx.db.insert("boards", {
      title: args.title,
      authorId: args.authorId,
      authorName: identity.name || "User",
      imageUrl: randomImage
    })

    return board
  }
})

export const getBoardListsCards = query({
  args: {
    boardId: v.id("boards")
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

    const lists = await ctx.db.query("lists")
      .withIndex("by_board", (q) => 
        q
          .eq("boardId", board._id)
      )
      .order("desc")
      .collect()
    
    

    const listsCardsPromises = async () => {
      const listsWithCards = await Promise.all(
        lists.map(async (list) => {
          const cards = await ctx.db.query("cards")
            .withIndex("by_list", (q) => q.eq("listId", list._id))
            .order("desc")
            .collect();

          return {
            ...list,
            cards
          };
        })
      );

    console.log(listsWithCards);
    return listsWithCards;
  };

    const listsCards = await listsCardsPromises()
    return {
      ...board,
      lists: listsCards
    }
    


  }
})


export const getBoardLists = query({
  args: {
    boardId: v.id("boards")
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

    const lists = await ctx.db.query("lists")
      .withIndex("by_board", (q) => 
        q
          .eq("boardId", args.boardId)
      )
      .order("desc")
      .collect()
   
    return {...board, lists}
  }
})


export const get = query({
  args: {
    boardId: v.id("boards")
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