<script>
    import Rating from "$lib/Rating.svelte";
    export let product;
</script>

<div class="border rounded-b-md p-1">
    <img src="{product.image}" alt="{product.name}">
    <div class="m-2 ">
        <div class="font-bold mb-2" >
            <a href='/product/{product._id}'>{product.name}</a>
        </div>
        <Rating stars={product.rating} reviews={product.rating} />
        <div class="text-xl font-bold mt-2">
            ${product.price}
        </div>
    </div>
</div>