import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);
  // communicate with  Ai gpt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding,Welcome the user always as Mr.jimmy and say welcome to the JimmyTrello todo clone App!
              Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos
            .Count how many todos are in each category such as To do in progress and done,
            then tell the user to have a productive day! Here's the date ${JSON.stringify(
              todos
            )}`,
      },
    ],
  });
//   console.log(response.choices[0].message)
  const {choices} = response;
  console.log("DaTA IS :",choices)
    console.log(choices[0].message)

return NextResponse.json(choices[0].message)

}
