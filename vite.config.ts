import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server:{
		allowedHosts:['*.repli.dev','**.replit.dev','02db2acd-774b-4333-8583-bde7a318087d-00-36q4ffwgveeiz.sisko.replit.dev']
	}
});
