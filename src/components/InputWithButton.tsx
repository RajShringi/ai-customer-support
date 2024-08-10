import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Send } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function InputWithButton({
  userMessage,
  setUserMessage,
  sendMessage,
  loading,
}: {
  userMessage: string;
  setUserMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex w-full pt-6 items-center space-x-2 sticky top-0 px-2">
      <Input
        type="text"
        placeholder="Type your message Here"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <Button type="submit" onClick={sendMessage} disabled={loading}>
        {loading ? <Loader className="animate-pulse" /> : <Send />}
      </Button>
    </div>
  );
}
