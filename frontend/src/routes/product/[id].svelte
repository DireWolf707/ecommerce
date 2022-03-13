<script>
    import Rating from "$lib/Rating.svelte";
    import { page } from '$app/stores';
    import devData from '../../dev-data/products';
    import { onMount } from 'svelte';

    let loaded = false;
    let productID;
    let product;
    onMount(() => {
        productID = $page.params.id;
        product = devData.find( (p) => p._id === productID );
        loaded = true;
    })
</script>

<div>
    {#if loaded}
    <a href="/">go back</a>
    <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="{product.image}">
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">{product.brand}</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
              <hr class="my-2">
              <div class="flex mb-4">
                <Rating stars={product.rating} reviews={product.rating} />
              </div>
              <p class="leading-relaxed">{product.description}</p>
              <hr class="my-2">

              <div class="border w-1/3 rounded-b-md mx-auto mt-4">
                <div class="border-b-2 py-2 px-4">
                    <div class="flex justify-between">
                        <div>
                            Price:
                        </div>
                        <div>
                            ${product.price}
                        </div>
                    </div>
                </div>
                <div class="py-2 px-4"> 
                    <div class="flex justify-between">
                        <div>
                            Status:
                        </div>
                        <div>
                            { product.countInStock >= 1 ? 'In Stock' : 'Out Of Stock' }
                        </div>
                    </div>
                </div>
                <button class="py-1 text-white bg-indigo-500 hover:bg-indigo-600 w-full rounded-b-md">ADD TO CART</button>
              </div>

            </div>
          </div>
        </div>
      </section>
    {/if}
</div>