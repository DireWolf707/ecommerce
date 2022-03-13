<script>
    export let stars;
    export let reviews;
</script>

<div class="text-yellow-400">
    <span>
        <i class={ stars >= 1 ? 'fas fa-star' : (stars >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star') }></i>
    </span>
    <span>
        <i class={ stars >= 2 ? 'fas fa-star' : (stars >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star') }></i>
    </span>
    <span>
        <i class={ stars >= 3 ? 'fas fa-star' : (stars >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star') }></i>
    </span>
    <span>
        <i class={ stars >= 4 ? 'fas fa-star' : (stars >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star') }></i>
    </span>
    <span>
        <i class={ stars >= 5 ? 'fas fa-star' : (stars >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star') }></i>
    </span>
    {#if reviews}
        <span class="ml-1 text-black font-bold">
            {reviews} reviews
        </span>
    {/if}
</div>