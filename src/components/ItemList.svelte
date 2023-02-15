<script lang="ts">
    import { flip } from "svelte/animate";
    import { sortData } from "../utility";
    import { todoList as todos } from "../stores";
    import TodoItem from "./TodoItem.svelte";

    export let listHeading: string;
    export let sortOption: string;
    export let sortAsc: boolean;
    export let completed: boolean;
    export let send;
    export let receive;
</script>

<!-- //////////////////////////// T E M P L A T E ///////////////////////////// -->
<h2 class="{listHeading}-heading">{listHeading}</h2>
{#each sortData( $todos.filter((t) => t.done === completed), sortOption, sortAsc ) as todo (todo.id)}
    <div animate:flip={{ duration: 500 }}>
        <TodoItem {todo} type={listHeading} {send} {receive} />
    </div>
{/each}

<!-- ////////////////////////////////////////////////////////////////-->
<style>
    h2 {
        font-size: 2em;
        font-weight: 200;
        user-select: none;
        margin: 0 0 0.5em 0;
    }
</style>
