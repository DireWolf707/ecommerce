<script>
    import {cart} from '$lib/stores/cart.js';

    export let item;
</script>

<div class="flex justify-between items-center p-2">
    <img class="h-24 w-24" src="{item.image}" alt="{item.name}">
    <a href="{`/product/${item._id}`}" 
        class="text-break w-2/5 fond-bold text-lg">
        {item.name}
    </a>
    <div>${item.price}</div>
    <div class="relative">
        <select bind:value="{item.qty}" on:change="{() => cart.add(item._id,item.qty)}"
        class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm pl-3 pr-10">
        {#each Array(item.countInStock) as _, i}
            <option>{i+1}</option>
        {/each}
        </select>
        <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path>
        </svg>
        </span>
    </div>
    <button on:click="{ () => cart.delete(item._id) }"
    class="hover:text-indigo-400"><i class="fa-solid fa-trash"></i></button>
</div>