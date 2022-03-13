<script>
    import ProductList from "$lib/ProductList.svelte";
    import axios from 'axios';
    import { onMount } from "svelte";

    let products = [];

    onMount(async () => {
        const res = await axios.get('http://localhost:8080/api/products');
        products = res.data.data;
    })
</script>

<h1>Welcome to Proshop</h1>

<div class="grid grid-cols-4 gap-4 w-4/5 mx-auto">
    {#each products as p (p._id)}
        <ProductList product={p} />
    {/each}
</div>


