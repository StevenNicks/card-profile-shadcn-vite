import { useEffect, useState } from "react";

interface GithubProfile {
   login: string;
   name: string;
   avatar_url: string;
   html_url: string;
   bio: string;
   followers: number;
   following: number;
   location: string;
   email: string;
}

export function useGithubProfile(username: string) {
   const [profile, setProfile] = useState<GithubProfile | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      async function fetchProfile() {
         try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) throw new Error("Error fetching GitHub profile");
            const data: GithubProfile = await res.json();
            setProfile(data);
         } catch (err) {
            setError((err as Error).message);
         } finally {
            setLoading(false);
         }
      }
      fetchProfile();
   }, [username]);

   return { profile, loading, error };
}
