<script>
    import { onDestroy } from "svelte";
    import { user } from "./stores/user";

    let currUser;
    let unsub = user.subscribe((_currUser) => {
        currUser = _currUser;
    })

    onDestroy(unsub);
</script>

<header class="bg-black border rounded-b-md mx-2 px-3 py-4">
    <div class="flex justify-between">
        <div class="text-white">
            <a href="/">PROSHOP</a>
        </div>
        <div class="flex text-xs text-gray-300 my-auto">
            <button class="mr-4 hover:text-white">
                <a href="/cart"><i class="fas fa-shopping-cart"></i> CART</a>
            </button>
            {#if currUser}
                <span class="mr-4 text-md hover:text-white">
                    <a href="/user/profile">{currUser.name}</a>
                </span>
                <button class="mr-4 hover:text-white" on:click="{user.logout}">
                    <i class="fa-solid fa-right-from-bracket"></i> LOGOUT
                </button>
            {:else}
                <button class="mr-4 hover:text-white">
                    <a href="/user/login"><i class="fa-solid fa-user"></i> SIGN IN</a>
                </button>
            {/if}
        </div>
    </div>
</header>