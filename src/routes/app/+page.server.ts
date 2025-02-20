import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: events } = await supabase.from("events").select("*").limit(5);
  return { events: events ?? [] };
};
