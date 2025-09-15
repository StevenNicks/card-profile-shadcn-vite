import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface MessageGithubProfileProps {
   error?: string
   message?: string
}

export function AlertMessage({ error, message }: MessageGithubProfileProps) {
   const isError = Boolean(error)

   return (
      <Alert variant={isError ? "destructive" : "default"}>
         {isError ? (
            <AlertCircle className="h-4 w-4" />
         ) : (
            <Info className="h-4 w-4" />
         )}
         <div>
            <AlertTitle>{isError ? "Error" : "Info"}</AlertTitle>
            <AlertDescription>{error ?? message}</AlertDescription>
         </div>
      </Alert>
   )
}
