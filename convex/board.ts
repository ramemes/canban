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

export const getBoard = query({
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