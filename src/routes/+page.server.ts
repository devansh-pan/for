import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: events } = await supabase.from("events").select("*").limit(5);

  return { events: events ?? [] };
};

export const actions = {
  github: async ({ locals: { supabase }, url }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:5173/auth/callback?next=/app`,
      },
    });
    console.log(data, error);
    if (error) return fail(500, { message: error.message });
    if (data.url) redirect(303, data.url);
  },
  logout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    redirect(303, "/");
  },
};
