import type { PageServerLoad} from './$types'
import {marked} from 'marked'
export const load:PageServerLoad = async ({locals: {supabase}, params}) => {
  const {data:post, error} = await supabase.from('posts').select('*').eq('slug',params.post)
  const content = await marked.parse(post[0]?.content ?? "no data");
  return {post:post ?? [] , content:content}
}