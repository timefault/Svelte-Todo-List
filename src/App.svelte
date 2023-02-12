<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { Todo } from "./todo-types";
  import { todoList as todos } from "./stores";
  import { getUID, sortData } from "./utility";
  import AddItemBar from "./components/AddItemBar.svelte";
  import SortOptions from "./components/SortOptions.svelte";

  let sortOption = "description";
  let sortAsc = true;

  let itemKeys = [
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

  function add(input: HTMLInputElement): void {
    const now = Date.now();
    const todo: Todo = {
      id: getUID(),
      done: false,
      description: input.value,
      createdAt: now,
      modifiedAt: now,
    };

    todos.update((val: Todo[]) => [todo, ...val]);
    input.value = "";
  }

  function remove(todo: Todo): void {
    $todos = $todos.filter((t) => t !== todo);
  }

  function mark(todo: Todo, done: boolean): void {
    todo.done = done;
    todo.modifiedAt = Date.now();
    remove(todo);
    $todos = $todos.concat(todo);
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Enter") add(e.target as HTMLInputElement);
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
    <SortOptions {itemKeys} {sortOption} />
    <div class="left">
      <h2 class="todo-heading">todo</h2>
      {#each sortData( $todos.filter((t) => !t.done), sortOption, sortAsc ) as todo (todo.id)}
        <label
          class="todo-item"
          in:receive={{ key: todo.id }}
          out:send={{ key: todo.id }}
          animate:flip={{ duration: 600 }}
        >
          <input type="checkbox" on:change={() => mark(todo, true)} />
          {todo.description}
          <button on:click={() => remove(todo)}>remove</button>
        </label>
      {/each}
    </div>

    <div class="right">
      <h2 class="done-heading">done</h2>
      {#each sortData( $todos.filter((t) => t.done), sortOption, sortAsc ) as todo (todo.id)}
        <label
          class="todo-item done"
          in:receive={{ key: todo.id }}
          out:send={{ key: todo.id }}
          animate:flip={{ duration: 600 }}
        >
          <input type="checkbox" checked on:change={() => mark(todo, false)} />
          {todo.description}
          <button on:click={() => remove(todo)}>remove</button>
        </label>
      {/each}
    </div>
  </div>
</div>

<!-- ////////////////////////////////////////////////////////////////////////////// -->
<style>
  .board {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    margin-inline: 1em;
  }

  .board > :global(input) {
    font-size: 1.4em;
    grid-column: 1/3;
  }
  .board > :global(.sort-options) {
    grid-column: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left,
  .right {
    display: flex;
    flex-direction: column;
  }
  :global(.add-item-bar) {
    padding: 0.125em;
  }
  .todo-heading {
    background-color: hsl(0, 0%, 20%);
    color: hsl(59, 100%, 58%);
    text-transform: uppercase;
    padding: 0.125em;
  }
  .done-heading {
    background-color: hsl(140, 40%, 50%);
    color: hsl(140, 40%, 95%);
    text-transform: uppercase;
    padding: 0.125em;
  }

  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
    margin: 0 0 0.5em 0;
  }

  label.todo-item {
    position: relative;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 2px;
    user-select: none;

    font-size: 1.125rem;
    border: 1px solid hsl(40, 50%, 70%);
    background-color: hsl(40, 50%, 98%);

    color: #000c2a;
  }

  input[type="checkbox"] {
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

  label.done {
    border: 1px solid hsl(140, 50%, 70%);
    background-color: hsl(140, 50%, 93%);
  }

  button {
    position: absolute;
    top: 0;
    right: 0.2em;
    width: 2em;
    height: 100%;
    background: no-repeat 50% 50%
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 1.4em 1.4em;
    border: none;
    opacity: 0;
    transition: opacity 0.2s;
    text-indent: -9999px;
    cursor: pointer;
  }

  label:hover button {
    opacity: 1;
  }
</style>
