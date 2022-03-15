<script>
    import { user } from "$lib/stores/user";
    import Message from '$lib/Message.svelte';

    let email='';
    let password='';
    let error;

    const loginHandler = async () => {
        try {
            await user.loginIn(email,password);
        } catch (e) {
            error = e.response.data.message;
            email = '';
            password = '';
        }
    }
</script>

<div class="w-1/3 mx-auto mt-8">
    {#if error}
        <Message description={error} />
    {/if}
    <form class="border-2 rounded-md p-2 mt-8" 
        on:submit|preventDefault="{loginHandler}">
        
        <h1 class="text-center font-bold text-lg">LOGIN</h1>

        <span>Email:</span>
        <input class="w-full border-2 rounded py-1 px-2"
        type="text" bind:value="{email}">

        <span>Password:</span>
        <input class="w-full border-2 rounded py-1 px-2"
        type="text" bind:value="{password}">

        <button class="w-full border rounded text-white bg-blue-500 hover:bg-blue-600 p-2 mt-2"
        type="submit">login</button>

    </form>
    <div class="flex justify-end p-1">
        <a href="/user/signup" class="text-blue-600 hover:text-blue-800">new user?</a>
    </div>
</div>