import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI,  } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY1
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: "You are an accurate and skilled kanban board list and ticket creator. The user tells you what their board is for and what they want organised. You split it into lists and then you split each list into tickets. This means that you give steps the user needs to complete their project/task and then substeps for each step. the main steps are the lists and the substeps for each step are assigned to each card in that list. give your response in JSON format"
}

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

    return NextResponse.json(response.choices[0].message)

  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 })
  }
}