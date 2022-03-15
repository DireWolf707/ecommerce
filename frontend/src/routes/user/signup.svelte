<script>
    import { user } from "$lib/stores/user";
    import Message from '$lib/Message.svelte';

    let email='';
    let password='';
    let name='';
    let error;

    const signupHandler = async () => {
        try {
            await user.signUp(email,password,name);
        } catch (e) {
            error = e.response.data.message;
            email = '';
            password = '';
            name = '';
        }
    }
</script>

<div class="w-1/3 mx-auto mt-8">
    {#if error}
        <Message description={error} />
    {/if}
    <form class="border-2 rounded-md p-2 mt-8" 
        on:submit|preventDefault="{signupHandler}">
        
        <h1 class="text-center font-bold text-lg">SIGNUP</h1>

        <span>Name:</span>
        <input class="w-full border-2 rounded py-1 px-2"
        type="text" bind:value="{name}">

        <span>Email:</span>
        <input class="w-full border-2 rounded py-1 px-2"
        type="text" bind:value="{email}">

        <span>Password:</span>
        <input class="w-full border-2 rounded py-1 px-2"
        type="text" bind:value="{password}">

        <button class="w-full border rounded text-white bg-blue-500 hover:bg-blue-600 p-2 mt-2"
        type="submit">sign up</button>

    </form>
    <div class="flex justify-end p-1">
        <a href="/user/login" class="text-blue-600 hover:text-blue-800">login?</a>
    </div>
</div>