<script lang="ts">
  /**
   *  plan the component first
   *
   *
   *
   *
   */
  import type { TaskPoole } from "./todo-types";
  import AddList from "./components/AddList.svelte";
  import AddItemBar from "./components/AddItemBar.svelte";

  let clicked = false;
  let taskPools: TaskPoole[] = [];

  function handleClick(e) {}
</script>

<!-- //////////////// T E M P L A T E //////////////////////////////////////////// -->

{#if !clicked}
  <button on:click={handleClick}>+</button>
{:else}
  <AddList />
{/if}

<!-- ////////////////////////////////////////////////////////////////////////////// -->
<style>
</style>
