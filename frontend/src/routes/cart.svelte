<script>
    import {cart} from '$lib/stores/cart.js';

    let items;
    cart.subscribe((_items) => {
        items = _items;
    })
</script>

<div>
    {#each items as item}
        {item.id} - {item.qty}
    {/each}
</div>