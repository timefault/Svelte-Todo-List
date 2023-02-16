<script lang="ts">
    import { sortData } from "../utility";
    import { todoList as todos } from "../stores";
    import TodoItem from "./TodoItem.svelte";
    import { flip } from "svelte/animate";

    export let listHeading: string;
    export let sortOption: string;
    export let sortAsc: boolean;
    export let completed: boolean;
    export let send;
    export let receive;
</script>

<!-- //////////////////////////// T E M P L A T E ///////////////////////////// -->
<div class="list-container">
    <h2 class="{listHeading}-heading list-heading">{listHeading}</h2>
    <div class="flex flex-column">
        {#each sortData( $todos.filter((t) => t.done === completed), sortOption, sortAsc ) as todo (todo.id)}
            <div animate:flip={{ duration: 500 }}>
                <TodoItem {todo} type={listHeading} {send} {receive} />
            </div>
        {/each}
    </div>
</div>

<!-- ////////////////////////////////////////////////////////////////-->
<style>
    h2 {
        font-size: 2em;
        font-weight: 200;
        user-select: none;
        margin: 0 0 0.5em 0;
    }
    .list-container {
        width: 100%;
    }
</style>
