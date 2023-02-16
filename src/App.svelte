<script lang="ts">
  /**
   * - Instead of pools, all items are tasks that can have sub-tasks
   */
  import type { Task } from "./todo-types";
  import { todoList as todos } from "./stores";
  import { getUID, sortData } from "./utility";
  import AddItemBar from "./components/AddItemBar.svelte";
  import SortOptions from "./components/SortOptions.svelte";
  import ItemList from "./components/ItemList.svelte";

  import { crossfade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let sortOption: string = "description";
  let sortAsc: boolean = true;

  let itemKeys: string[][] = [
    ["created", "createdAt"],
    ["description", "description"],
    ["modified", "modifiedAt"],
  ];

  todos.subscribe((val) => {
    localStorage.setItem("content", JSON.stringify(val));
    console.warn(`[!] store updated, ${val.length} written`);
  });

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  function parseDuration(input: string | number): number {
    return 20;
  }
  function add(input: HTMLInputElement): void {
    // determine which textbox the event originates
    let taskDescription, taskDuration;
    if (input.classList.contains("add-item-bar")) {
      taskDescription = input;
      taskDuration = input.nextElementSibling;
    } else {
      taskDescription = input.previousElementSibling;
      taskDuration = input;
    }

    if (taskDescription.value === "") return;
    let duration = parseDuration(input.value);

    console.log(taskDescription, taskDuration);
    const now = Date.now();
    const todo: Task = {
      id: getUID(),
      done: false,
      description: taskDescription.value,
      createdAt: now,
      modifiedAt: now,
      duration: duration,
    };

    todos.update((val: Task[]) => [todo, ...val]);
    taskDescription.value = "";
    taskDescription.focus();
    taskDuration.value = "";
  }

  function handleKeydown(e: Event): void {
    let key = (e as KeyboardEvent).key;
    switch (key) {
      case "Enter":
        add(e.target as HTMLInputElement);
        break;
    }
  }

  function handleOrderSelection(e: any) {
    console.log("+");
    let value = e.target.value;
    if (sortOption === value) {
      sortAsc = !sortAsc;
    } else sortAsc = true;
    sortOption = value;
  }
</script>

<!-- //////////////// T E M P L A T E //////////////////////////////////////////// -->
<div class="container">
  <div class="board">
    <AddItemBar on:keydown={handleKeydown} />
    <SortOptions {itemKeys} {sortOption} on:click={handleOrderSelection} />
    <div class="lists ">
      <ItemList
        listHeading="todo"
        {sortOption}
        {sortAsc}
        {send}
        {receive}
        completed={false}
      />
      <ItemList
        listHeading="done"
        {sortOption}
        {sortAsc}
        {send}
        {receive}
        completed={true}
      />
    </div>
  </div>
</div>

<!-- ////////////////////////////////////////////////////////////////////////////// -->
<style>
  .board {
    display: flex;
    flex-direction: column;
  }

  :global(.sort-options) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 1em;
  }
  .lists {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    margin-block: 1em;
  }
  :global(.list-heading) {
    flex-grow: 1;
    text-transform: uppercase;
    padding: 0.125em;
  }
  :global(.todo-heading) {
    background-color: hsl(0, 0%, 20%);
    color: hsl(59, 100%, 58%);
  }
  :global(.done-heading) {
    background-color: hsl(140, 40%, 50%);
    color: hsl(140, 40%, 95%);
  }

  :global(label.item) {
    display: block;
    position: relative;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 2px;
    user-select: none;
    color: #000c2a;
    font-size: 1.125rem;
  }
  :global(label.todo-item) {
    border: 1px solid hsl(40, 50%, 70%);
    background-color: hsl(40, 50%, 98%);
  }

  :global(input[type="checkbox"]) {
    position: absolute;
    left: 0.5em;
    top: 0.6em;
    margin: 0;
  }
  :global(input[type="radio"]) {
    display: none;
  }
  :global(.sort-buttons) {
    border-radius: 16px;
    border: 1px solid hsl(200, 50%, 70%);
    background-color: hsl(200, 50%, 98%);
    color: hsl(200, 50%, 40%);
    padding: 0.25em 0.5em;
    margin-inline-end: 0.5em;
    font-weight: 500;
    font-size: 0.9rem;
    user-select: none;
  }
  :global(input[type="radio"]:checked + label) {
    border: 1px solid hsl(200, 50%, 98%);
    background-color: hsl(200, 50%, 80%);
    color: hsl(200, 100%, 30%);
  }

  :global(label.done-item) {
    border: 1px solid hsl(140, 50%, 70%);
    background-color: hsl(140, 50%, 93%);
  }
</style>
