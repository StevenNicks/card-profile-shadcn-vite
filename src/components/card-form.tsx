import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, Link2 } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle'
import { useGithubProfile } from '@/components/useInstagramProfile'
import { Loader } from '@/components/loader'
import { AlertMessage } from '@/components/alertMessage'

interface CardFormProps extends React.ComponentProps<"article"> {
   username: string
}

export function CardForm({ className, username, ...props }: CardFormProps) {
   const { profile, loading, error } = useGithubProfile(username)
   console.log(profile);

   if (loading) return <Loader />
   if (error) return <AlertMessage error={error} />
   if (!profile) return <AlertMessage message="No se encontró el perfil" />

   return (
      <>
         <div className="absolute top-4 right-4 z-50">
            <ModeToggle variant="secondary" />
         </div>
         <article className={cn("flex flex-col gap-6 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto", className)} {...props}>
            <Card className="p-2 gap-3 relative overflow-visible shadow-xl/30 rounded-3xl">
               <CardHeader className="text-center p-0 relative">
                  {/* <div className="bg-pattern rounded-2xl h-[200px] p-3" /> */}
                  <img
                     src="https://i.pinimg.com/736x/d0/de/9a/d0de9aa6612b61e627d95f9282cd89db.jpg"
                     alt="Background"
                     className="rounded-2xl h-[200px] w-full object-cover"
                  />
                  <Avatar className="size-25 border-4 border-card absolute left-1/6 -bottom-10 -translate-x-1/2">
                     <AvatarImage
                        src={profile.avatar_url}
                        alt={`${profile.name ?? profile.login} profile picture`}
                     />
                     <AvatarFallback>GH</AvatarFallback>
                  </Avatar>
               </CardHeader>
               <CardContent className="p-3 pt-9">
                  <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                     <div>
                        <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                           {profile.login ?? profile.name}
                           <BadgeCheck className="text-primary" />
                        </h2>
                        <a className="text-sm text-muted-foreground"
                           href={`https://www.instagram.com/${profile.name}/`}
                           target="_blank" rel="noopener noreferrer">
                           @{profile.name}
                        </a>
                     </div>
                     <Button
                        type="button"
                        aria-label={`Follow ${profile.login} on GitHub`}
                        className="text-card rounded-3xl px-9"
                        asChild
                     >
                        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                           Follow
                        </a>
                     </Button>
                  </header>

                  <section aria-label="Bio" className="mt-3 leading-relaxed">
                     {profile.bio ? (
                        <p className="text-sm text-muted-foreground">{profile.bio}</p>
                     ) : (
                        <p className="text-sm text-muted-foreground italic">
                           Este usuario no tiene biografía
                        </p>
                     )}
                  </section>

                  {/* <section aria-label="Bio" className="mt-3 leading-relaxed">
                  <p className="text-sm text-muted-foreground">Desarrollador Full Stack.</p>
                  <p className="text-sm text-muted-foreground">
                     Experiencia en{" "}
                     <span className="text-primary font-semibold">React,</span>{" "}
                     <span className="text-primary font-semibold">TypeScript</span> y{" "}
                     <span className="text-primary font-semibold">Tailwind</span> en frontend, así como{" "}
                     <span className="text-primary font-semibold">Node.js</span> y{" "}
                     <span className="text-primary font-semibold">Laravel</span> en backend.
                     Orientado a la creación de aplicaciones web seguras, escalables y con una excelente experiencia de usuario.
                  </p>
               </section> */}

                  <section aria-label="User stats" className="mt-3">
                     <ul className="flex flex-col sm:flex-row sm:gap-6 gap-2">
                        <li className="flex gap-2" aria-label={`${profile.following} Following`}>
                           <span className="font-bold">{profile.following}</span>
                           <span className="text-muted-foreground">Following</span>
                        </li>
                        <li className="flex gap-2" aria-label={`${profile.followers} Followers`}>
                           <span className="font-bold">{profile.followers}</span>
                           <span className="text-muted-foreground">Followers</span>
                        </li>
                     </ul>
                  </section>
                  <footer className="flex mt-3">
                     <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 text-base truncate"
                     >
                        <Link2 className="rotate-[-45deg] size-[1rem] text-muted-foreground" />
                        {profile.html_url.replace("https://", "")}
                     </a>
                  </footer>
               </CardContent>
            </Card>
         </article >
      </>
   );
}
