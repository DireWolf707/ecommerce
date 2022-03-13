<script>
    import ProductList from "$lib/ProductList.svelte";
    import devData from '../dev-data/products';
    const products = devData;
    import axios from 'axios';
    import { onMount } from "svelte";

    onMount(async () => {
        const data = await axios.get('http://localhost:8080');
        console.log(data);
    })
</script>

<h1>Welcome to Proshop</h1>

<div class="grid grid-cols-4 gap-4 w-4/5 mx-auto">
    {#each products as p (p._id)}
        <ProductList product={p} />
    {/each}
</div>


