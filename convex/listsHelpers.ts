import { Doc, Id } from "./_generated/dataModel";
import { QueryCtx } from "./_generated/server";

export async function getListsByBoardId(ctx: QueryCtx, id: Id<"boards">): Promise<Doc<"lists">[]> {
  const lists = await ctx.db.query("lists")
  .withIndex("by_board", (q) => 
    q
      .eq("boardId", id)
  )
  .order("desc")
  .collect()

  return lists
}

export async function getCardsByListId(ctx: QueryCtx, id: Id<"lists">): Promise<Doc<"cards">[]> {
  const cards = await ctx.db.query("cards")
  .withIndex("by_list", (q) => 
    q
      .eq("listId", id)
  )
  .order("desc")
  .collect()

  return cards
}