<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let open = false;

    const dispatcher = createEventDispatcher();
    function handleClick(e: Event) {
        open = !open;
    }
</script>

<!--//////////////////// T E M P L A T E //////////////////// -->

<div on:click={handleClick} class="card">
    <slot name="description" />
    {#if open}
        {#if $$slots["sub-tasks"]}
            <div class:sub-task={open}>
                <slot name="sub-tasks" />
            </div>
        {/if}
    {/if}
</div>

<!--/////////////////////////////////////////////////////////  -->
<style>
    .card {
        padding: 1em;
        color: #222c2a;
        background-color: hsl(118, 25%, 70%);
        margin-block-end: 0.25em;
    }
    .open {
        /* height: 80vh; */
    }
    .sub-task {
        background-color: lightblue;
        padding: 1em;
        margin-top: 0.125em;
    }
</style>
