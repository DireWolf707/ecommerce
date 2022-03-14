<script>
    import ProductList from "$lib/ProductList.svelte";
    import Loading from "$lib/Loading.svelte";
    import Message from "$lib/Message.svelte";
    import axios from 'axios';
    import { onMount } from "svelte";

    let products;
    let error;

    onMount(async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/products');
            products = res.data.data;
        } catch (e) {
            console.log(e);
            error = e.message;
        } 
    })
</script>

{#if error}
    <div class="w-4/5 mx-auto mt-4">
        <Message description={error} />
    </div>
{:else if products}
    <div class="grid grid-cols-4 gap-4 w-4/5 mx-auto mt-4">
        {#each products as p (p._id)}
            <ProductList product={p} />
        {/each}
    </div>
{:else}
    <Loading />
{/if}
