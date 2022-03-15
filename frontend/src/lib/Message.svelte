<script>
    export let title = "Error";
    export let description = "Something not ideal might be happening";
</script>

<div role="alert" class="mx-16 my-8">
    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {title}
    </div>
    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{description}</p>
    </div>
</div>