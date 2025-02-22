<script lang="ts">
	//import { goto } from "$app/navigation";
	import type { Snapshot } from "./$types";
	import slugify from "slugify";
	import { invalidate, invalidateAll } from "$app/navigation";
	import { PUBLIC_SUPABASE_URL } from "$env/static/public";
	import { marked } from "marked";
	import { supabase } from "$lib/supabase";
	let { data } = $props();
	let { posts } = $derived(data);
	let posts_ = $state(posts ?? []);
	console.log(posts_);
	let epost = $state({
		id: crypto.randomUUID(),
		md: "",
		title: "",
		slug: "",
		description: "",
	});
	let status = $state({ message: "", type: "" });
	export const snapshot: Snapshot = {
		capture: () => epost.md,
		restore: (value) => (epost.md = value),
	};
	const postsFetch = async () => {
		let { data, error } = await supabase
			.from("posts")
			.select("*")
			.neq("deleted", true)
			.order("posted_at", { ascending: false });
		if (!error) {
			posts_ = data ?? [{}];
			//	console.log(posts);
		}
	};
	async function post(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
	) {
		event.preventDefault();
		if (epost.title === "" || epost.md === "") {
			status.type = "error";
			return (status.message = "Cannot be empty ");
		}
		const { data, error } = await supabase.from("posts").upsert([
			{
				id: epost.id,
				title: epost.title,
				content: epost.md,
				slug: epost.slug.toLowerCase(),
				description: epost.description,
				posted_at: new Date().toISOString(),
			},
		]);
		if (error) {
			status.message = error.message;
			status.type = "error";
			console.log(error.message);
		} else {
			status.message = "Posted successfully";
			invalidateAll();
			status.type = "success";
			const existingPostIndex = posts_.findIndex(
				(post) => post.id === epost.id,
			);
			if (existingPostIndex !== -1) {
				posts_[existingPostIndex] = {
					id: epost.id,
					title: epost.title,
					content: epost.md,
					slug: epost.slug,
				};
			} else {
				posts_.push(epost);
			}
			epost = {
				title: "",
				md: "",
				slug: "",
				id: crypto.randomUUID(),
				description: "",
			};
			setTimeout(() => {
				status.message = "";
				status.type = "";
			}, 3000);
		}
	}

	async function deletePost(id: string): Promise<null> {
		// event.preventDefault()
		let { data, error } = await supabase
			.from("posts")
			.update([{ deleted: true }])
			.eq("id", id)
			.select("*");
		if (!error) {
			status.type = "success";
			status.message = "Deleted successfully";
			posts_ = posts_.filter((post) => post.id !== id);
			invalidateAll();
		} else if (error) {
			status.type = "error";
			status.message = error.message;
			console.log(error.message);
		}
		return null;
	}
</script>

<svelte:head>
	<title>Svelty</title>
	<meta name="description" content="Sveltz" />
</svelte:head>

<br />
{#if posts !== null}<div class="flex flex-col">
		{#each posts as post, i}
			<div class="flex flex-col">
				<div class="border p-4">
					<a href="/posts/{post.slug}">
						<h2 class="my-2 text-2xl font-bold">{post.title}</h2></a
					>

					<div class="prose">
						{@html marked.parse(post?.description ?? "No data")}
					</div>
					<br />
					<button class="m-1 border p-1" onclick={() => deletePost(post.id)}
						>Delete</button
					>
					<button
						onclick={() => {
							(epost.title = post.title),
								(epost.md = post.content),
								(epost.id = post.id),
								(epost.slug = post.slug),
								(epost.description = post.description);
						}}
						class="m-1 border p-1">Edit</button
					>
				</div>
			</div>
		{/each}
	</div>
{/if}
<br />
<p
	data-status={status.type}
	class="border p-2 text-gray-50 data-[status]:border-none data-[status=error]:bg-red-500 data-[status=success]:bg-green-500"
>
	{status.message ?? ""}
</p>
<br />

<form method="POST" onsubmit={post} action="/?post">
	<label for="title">
		Post title :
		<input
			required
			type="text"
			class="h-12 w-full border px-2"
			id="title"
			name="title"
			placeholder="Post title"
			bind:value={epost.title}
		/>
	</label>
	<br />

	Preview:
	<div class="prose min-h-25 border p-2">
		{@html marked.parse(epost.md)}
	</div>
	<label for="content">
		Post content
		<textarea
			rows="2"
			class="field-content [field-sizing:content] min-h-25 w-full border p-2"
			placeholder="Write something"
			id="content"
			name="content"
			bind:value={epost.md}
		>
		</textarea>
	</label>
	<div class="m-1" id="desc">
		<label for="desc"
			>Description:
			<input class="peer" type="checkbox" />
			<textarea
				class="border hidden peer-checked:block w-full p-2"
				id="desc"
				name="desc"
				bind:value={epost.description}
			></textarea>
		</label>
		<br>
		<label for="slug">Slug: &nbsp;<input type="checkbox" class="peer">
			
			<input class=" border p-1 peer-checked:block hidden" type="text" id="slug" name="slug" bind:value={epost.slug} >
		</label>
	</div>
	<button
		disabled={epost.md === "" && epost.title === ""}
		onclick={() => {
			(epost.id = crypto.randomUUID()), (epost.md = ""),(epost.description = ''), (epost.title = ""),(epost.slug = '');
		}}
		class="m-2 border p-1 disabled:hidden">Discard</button
	>
	<button
		disabled={epost.md === "" || epost.title === ""}
		formaction="/"
		class="m-4 ml-50 disabled:hidden border p-1 text-xl"
		type="submit">Post</button
	>
</form>
