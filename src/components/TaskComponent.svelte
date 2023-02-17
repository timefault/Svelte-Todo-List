<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();
    function handleClick(e: Event) {
        dispatcher("taskClicked", { target: e.target });
    }
</script>

<!--//////////////////// T E M P L A T E //////////////////// -->

<div on:click={handleClick} class="card">
    <slot name="description" />
</div>

<!--/////////////////////////////////////////////////////////  -->
<style>
    .card {
        padding: 1em;
        color: #222c2a;
        background-color: hsl(118, 25%, 70%);
        margin-block-end: 0.25em;
    }
</style>
