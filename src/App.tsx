import { CardForm } from "@/components/card-form"

function App() {
   // Capturamos lo que viene en la URL después del "/"
   const path = window.location.pathname.replace("/", "")
   const username = path || "StevenNicks" // 👈 fallback si no hay username

   return (
      <div className="bg-primary flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
         <div className="flex w-full max-w-sm flex-col gap-6">
            <CardForm username={username} /> {/* 👈 pasamos la prop */}
         </div>
      </div>
   )
}

export default App
