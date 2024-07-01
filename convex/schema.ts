import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    imageUrl: v.string(),
    title: v.string(),
    authorId: v.string(),
    authorName: v.string(),
  })
    .index("by_author_id", ["authorId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["authorId"]
    }),


  lists: defineTable({
    title: v.string(),
    color: v.string(),
    index: v.number(),
    boardId: v.id("boards")
  })
    .index("by_board", ["boardId"]),

  cards: defineTable({
    title: v.string(),
    description: v.string(),
    color: v.string(),
    index: v.number(),
    listId: v.id("lists")
  })
    .index("by_list", ["listId"])
})