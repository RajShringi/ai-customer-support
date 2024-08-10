import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorAlert({ errorMsg }: { errorMsg: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  );
}
