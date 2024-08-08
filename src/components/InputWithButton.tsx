import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export function InputWithButton({
  userMessage,
  setUserMessage,
  sendMessage,
}: {
  userMessage: string;
  setUserMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
}) {
  return (
    <div className="flex w-full pt-6 items-center space-x-2 sticky top-0 px-2">
      <Input
        type="text"
        placeholder="Type your message Here"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <Button type="submit" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
}
