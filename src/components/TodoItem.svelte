<script lang="ts">
    import type { Todo } from "../todo-types";
    import { todoList as todos } from "../stores";

    export let todo: Todo;
    export let type: string; // should be enum
    export let send;
    export let receive;

    function mark(todo: Todo): void {
        todo.done = !todo.done;
        todo.modifiedAt = Date.now();
        remove(todo);
        $todos = $todos.concat(todo);
    }

    function remove(todo: Todo): void {
        $todos = $todos.filter((t) => t !== todo);
    }
</script>

<!-- /////////////////////////// T E M P L A T E ////////////////////////// -->
<label
    class="{type}-item item"
    in:receive={{ key: todo.id }}
    out:send={{ key: todo.id }}
>
    <input type="checkbox" on:change={() => mark(todo)} />
    {todo.description}
    <button on:click={() => remove(todo)}>remove</button>
</label>

<!-- ////////////////////////////////////////////////////////////////////// -->
<style>
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
