<script>
    import {cart} from '$lib/stores/cart.js';
    import CartList from '$lib/CartList.svelte';
    import Loading from '$lib/Loading.svelte';
    import { onDestroy, onMount } from 'svelte';
    
    let items;
    let total;
    let unsub = cart.subscribe((_items) => {
        if (_items) {
            items = _items;
            let _total = 0;
            items.forEach(e => {
                _total= _total+e.price*e.qty
            });
            total=Math.round(_total * 100)/100;
        }
    })

    onMount(() => {
        const _items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cart.set(_items);
    });

    onDestroy(unsub);
   
</script>

{#if items} 
    <div class="flex mx-8 mt-4">
        <div class="w-1/2">
            <div class="p-2">
                <h1 class="font-bold text-3xl p-2 border-b-2 mb-2">Shopping Cart</h1>
                {#each items as item (item._id)}
                    <CartList {item} />
                {/each}
            </div>
        </div>
        <div class="w-1/3 mx-auto">
            <div class="p-4">
                <div class="font-bold text-3xl opacity-70">SUBTOTAL ({items.length}) ITEMS</div>
                <div class="opacity-90 text-lg mt-2">$ {total}</div>
                <div class="border-2 rounded-lg p-2 mt-4">
                    <button class="w-full bg-black text-white hover:bg-blue-400 py-3 rounded-md">
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    </div>
{:else}
    <Loading />
{/if}