<script lang="ts">
  import Addlist from "./components/AddList.svelte";
  /**
   *  plan the component first
   *
   *
   *
   *
   */
  import type { TaskPool } from "./todo-types";
  import AddList from "./components/AddList.svelte";
  import AddItemBar from "./components/AddItemBar.svelte";

  let clicked = false;
  let taskPools: TaskPool[] = [];

  function handleClick(e) {}
</script>

<!-- //////////////// T E M P L A T E //////////////////////////////////////////// -->

<div class="test-container">
  <AddList />
</div>

<!-- ////////////////////////////////////////////////////////////////////////////// -->
<style>
  .test-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
  }
</style>
