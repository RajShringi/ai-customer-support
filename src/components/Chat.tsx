"use client";
import { useState } from "react";
import { InputWithButton } from "./InputWithButton";
import { Brain } from "lucide-react";
import Markdown from "react-markdown";

export default function Chat() {
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "Hi I am Fortnite assistant. How can I help you?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async () => {
    setUserMessage("");
    setAiMessages((aiMessages) => [
      ...aiMessages,
      { role: "user", content: userMessage },
    ]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ...aiMessages,
          { role: "user", content: userMessage },
        ]),
      });
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      const data = await res.json();
      console.log(data);

      setAiMessages((aiMessages) => [
        ...aiMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-input rounded-xl p-2 max-w-[800px] w-full relative">
      <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-4">
        {aiMessages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-md flex ${
              message.role === "assistant" ? "" : `border border-input self-end`
            }`}
          >
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                {message.role === "assistant" ? (
                  <div className="border border-input rounded-full p-1">
                    <Brain className="w-[24px] h-[24px]" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {" "}
                <Markdown className="prose">{message.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <InputWithButton
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
