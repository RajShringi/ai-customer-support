import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const systemPrompt = `
User:

Hi there! I need some help with Fortnite.

AI:

Hello! I'd be happy to help you with Fortnite. Are you experiencing issues with gameplay, purchasing the Battle Pass, or something else? Please provide more details so I can assist you better.

For more specific scenarios, here are a few tailored prompts:

Gameplay Issues:

User:

I'm having trouble with my game lagging during matches.

AI:

I'm sorry to hear about the lag you're experiencing. Let's try to fix that. Could you please let me know if you're playing on a PC, console, or mobile device? Also, have you tried checking your internet connection and ensuring that your device meets the game's system requirements?

Battle Pass Purchase:

User:

I tried to buy the Battle Pass, but the purchase didn't go through.

AI:

Oh no! Let's get that sorted out. Did you receive any error messages when you tried to purchase the Battle Pass? Also, could you confirm whether you're using in-game currency (V-Bucks) or another payment method? This information will help me assist you more effectively.

General Inquiry:

User:

Can you tell me more about the current Battle Pass?

AI:

Absolutely! The current Battle Pass offers a variety of exclusive rewards, including skins, emotes, and other cosmetics that you can unlock as you level up. You can purchase the Battle Pass in the Fortnite in-game store. Would you like more information on the rewards or how to level up your Battle Pass quickly?
`;

export async function POST(req: Request) {
  ///api/chat -> POST Method
  const data = await req.json();
  console.log(data);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data],
    model: "meta-llama/llama-3.1-8b-instruct:free",
  });
  console.log(completion.choices[0].message.content);
  return NextResponse.json(
    { message: completion.choices[0].message.content },
    { status: 200 }
  );
}
