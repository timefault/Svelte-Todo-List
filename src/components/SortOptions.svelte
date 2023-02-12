<script lang="ts">
    export let itemKeys: string[][];
    export let sortOption: string;
</script>

<!-- //////////////////////////////////////// T E M P L A T E ////////////////////////////////////////  -->
<div class="sort-options">
    {#each itemKeys as [description, field] (field)}
        <input
            type="radio"
            bind:group={sortOption}
            id={field}
            value={field}
            on:click
        />
        <label class="sort-buttons " for={field}>
            {description}
        </label>
    {/each}
</div>

<!-- /////////////////////////////////////////////////////////////////////////////////////////////////  -->
<style></style>
