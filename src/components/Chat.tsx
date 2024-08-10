"use client";
import { useEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "" });
  const [userMessage, setUserMessage] = useState("");
  const bottomOfThePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfThePanelRef.current) {
      bottomOfThePanelRef.current.scrollIntoView();
    }
  }, [aiMessages]);

  const sendMessage = async () => {
    try {
      setLoading(true);
      setUserMessage("");
      setAiMessages((aiMessages) => [
        ...aiMessages,
        { role: "user", content: userMessage },
        { role: "assistant", content: "" },
      ]);

      const res = await fetch("api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ...aiMessages,
          { role: "user", content: userMessage },
        ]),
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          setAiMessages((aiMessages) => {
            let otherMessages = aiMessages.slice(0, aiMessages.length - 1);
            let lastMessage = aiMessages[aiMessages.length - 1];
            return [
              ...otherMessages,
              { role: "assistant", content: lastMessage.content + chunk },
            ];
          });
        }
      } else {
        console.error("Failed to initiate chat stream", res.status);
      }
    } catch (error) {
      console.log(error);
      setError({ isError: true, msg: "something went wrong" });
    } finally {
      setLoading(false);
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
        <div ref={bottomOfThePanelRef}></div>
      </div>
      <InputWithButton
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}
