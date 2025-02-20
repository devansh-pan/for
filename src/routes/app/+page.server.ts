import type { PageServerLoad } from "./$types";
import { marked} from 'marked'
export const load: PageServerLoad = async ({ locals: { supabase }, depends }) => {
  depends('p:posts');
  const { data: posts } = await supabase.from("posts").select("*").neq("deleted",true);
  return { posts: posts ?? [] };
};
