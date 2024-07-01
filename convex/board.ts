import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBoard = mutation({
  args: {
    authorId: v.string(),
    title: v.string(),
    response: v.optional(v.string()),
    imageUrl: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || identity.subject !== args.authorId) {
      throw new Error("Unauthorized");
    }

    const boardId = await ctx.db.insert("boards", {
      title: args.title,
      authorId: args.authorId,
      authorName: identity.name || "User",
      imageUrl: args.imageUrl
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

      // const listPromises = responseObj.categories.map((category: any) => {
      //   count++
      //   return ctx.db.insert("lists", {
      //     boardId: boardId,
      //     title: category.title,
      //     color: "000000",
      //     index: count
      //   })
      // })
      //   await Promise.all(listPromises)
      // }
    }

    return boardId
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
    // if (!args.title.length || args.title.length > 40) {
    //   throw new Error("Title must be between 0 and 40 characters")
    // }

    
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
