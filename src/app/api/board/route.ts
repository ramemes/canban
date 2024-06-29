import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI  } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY1
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `You accurately break down a task into categories and steps in the style of a kanban relevant to the user request. This means that you give the categories of operation the user needs to complete their project/task and then the steps for each category. give your response in pure JSON format (no text before or after the JSON). Use this JSON structure for naming and nesting but dont overfit it. and use the same names (lower case) for the keys: {
    "categories": [
        {
            "title": "Category",
            "steps": [
                "Step 1",
                "Step 2",
                "Step 3"
            ]
        },
        {
            "title": "Category",
            "steps": [
                "Step 12",
                "Step 21",
                "Step 33"
            ]
        },
        {
            "title": "Category",
            "steps": [
                "Step 14",
                "Step 21",
                "Step 36"
            ]
        }
    ]
},`
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
      model: "gpt-4",
      messages: [instructionMessage, ...messages]
    });

    return NextResponse.json(response.choices[0].message)

  } catch (error) {
    // console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 })
  }
}