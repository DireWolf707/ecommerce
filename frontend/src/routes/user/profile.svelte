<script>
    import { goto } from "$app/navigation";
    import Loading from "$lib/Loading.svelte";
    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";
    import Message from '$lib/Message.svelte';

    let loading = true;
    let currUser;
    let pass1 = '';
    let pass2 = '';
    let name;
    let email;
    let error;

    onMount(() => {
        currUser = $user;
        if (!currUser) {
            goto('/')
        } else {
            name = currUser.name;
            email = currUser.email;
            loading = false;
        } 
    })

    const updateUserHandler = async () => {
        try {
            loading=true;
            await user.updateUser(email,name)
            error = undefined;
        } catch (e) {
            error = e.response.data.message;
        } finally {
            loading = false;
        }
    }

    const updatePasswordHandler = async () => {
        try {
            loading=true;
            await user.updatePassword(pass1,pass2)
            error = undefined;
        } catch (e) {
            error = e.response.data.message;
        } finally {
            loading = false;
        }
    }
    
</script>

{#if !loading}

    {#if error}
        <Message description={error} />
    {/if}
    
    <div class="flex mt-8 mx-16">
        <div class="w-1/3 p-4">
            <div>
                <h1 class="font-bold text-2xl border-b-2 mb-4">Personal Details</h1>
                <form on:submit|preventDefault="{updateUserHandler}">
                    <span>Name:</span>
                    <input class="w-full border-2 rounded py-1 px-2"
                    type="text" bind:value="{name}">
        
                    <span>Email:</span>
                    <input class="w-full border-2 rounded py-1 px-2"
                    type="text" bind:value="{email}">
                    <div class="flex justify-end ">
                        <button class="border rounded text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 mt-2" 
                        type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div class="mt-10">
                <h1 class="font-bold text-2xl border-b-2 mb-4">Change Password</h1>
                <form on:submit|preventDefault="{updatePasswordHandler}">
                    <span>New Password:</span>
                    <input class="w-full border-2 rounded py-1 px-2"
                    type="text" bind:value="{pass1}">
        
                    <span>Retype Password:</span>
                    <input class="w-full border-2 rounded py-1 px-2"
                    type="text" bind:value="{pass2}">

                    <div class="flex justify-end ">
                        <button class="border rounded text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 mt-2" 
                        type="submit">submit</button>
                    </div>
                </form>
            </div>

            <button></button>
        </div>
        <div class="w-2/3 p-4">
            <h1 class="font-bold text-2xl border-b-2">Orders</h1>
        </div>
    </div>
{:else}
    <Loading />
{/if}
