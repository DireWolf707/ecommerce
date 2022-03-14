<script>
    import Rating from "$lib/Rating.svelte";
    import Loading from "$lib/Loading.svelte";
    import Message from "$lib/Message.svelte";
    import axios from 'axios';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import {cart} from '$lib/stores/cart.js';

    let product;
    let error;
    let qty;

    onMount(async () => {
        try {
          const productID = $page.params.id;
          const res = await axios.get(`http://localhost:8080/api/products/${productID}`);
          product = res.data.data;
        } catch (e) {
            console.log(e);
            error = e.message;
        }
    })

    const addToCart = () => {
      cart.add(product._id,qty);
      goto('/cart');
    }
</script>


{#if error}
    <div class="w-4/5 mx-auto mt-4">
        <Message description={error} />
    </div>
{:else if product}
<section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="ml-40 mb-2 hover:text-blue-400">
        <a href="/"><i class="fa-solid fa-arrow-left"></i> go back</a>
      </div>
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

          <div class="border w-1/3 rounded-b-md mx-auto mt-6">

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

            <div class="border-b-2 py-2 px-4"> 
                <div class="flex justify-between">
                    <div>
                        Status:
                    </div>
                    <div>
                        { product.countInStock >= 1 ? 'In Stock' : 'Out Of Stock' }
                    </div>
                </div>
            </div>

            {#if product.countInStock}
              <div class="py-2 px-4"> 
                <div class="flex justify-between items-center">
                    <div>
                        Qty:
                    </div>
                    <div class="relative">
                      <select bind:value="{qty}"
                      class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm pl-3 pr-10">
                        {#each Array(product.countInStock) as _, i}
                          <option>{i+1}</option>
                        {/each}
                      </select>
                      <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                </div>
            </div>
            {/if}
            <button on:click="{addToCart}" disabled={!product.countInStock}
            class="py-1 text-white {product.countInStock ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-black'} w-full rounded-b-md">ADD TO CART</button>
          </div>

        </div>
      </div>
    </div>
  </section>
{:else}
  <Loading />
{/if}
