<script lang="ts">
    import type { Task } from "../todo-types";
    import { todoList as todos } from "../stores";
    import { getUID, sortData } from "../utility";
    import AddItemBar from "./AddItemBar.svelte";
    import SortOptions from "./SortOptions.svelte";
    import ItemList from "./ItemList.svelte";

    import { crossfade } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    // export let id: number;
    // export let description: string = "Untitled";
    export let description;
    export let tasks: Task[] = [];
    export let duration: number = -1;

    let startTime = Date.now(),
        finishTime = startTime + duration;
    let timeNow = Date.now();
    let interval = setInterval(() => (timeNow = Date.now()), 16);
    $: if (timeNow >= finishTime) {
        clearInterval(interval);
        progressValue = 0;
    }

    $: progressValue = (finishTime - timeNow) / duration;
    $: progressBarWidth = progressValue * 100;
    $: progressBarBackgroundColor = `rgb(${255 * (1 - progressValue)}, ${
        255 * progressValue
    }, ${progressValue / 2})`;

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

    // add item to list
    function add(input: HTMLInputElement): void {
        const now = Date.now();
        const todo: Task = {
            id: getUID(),
            done: false,
            description: input.value,
            createdAt: now,
            modifiedAt: now,
        };

        todos.update((val: Task[]) => [todo, ...val]);
        input.value = "";
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

<div class="board">
    <h1 class="full-width">{description}</h1>
    <div class="progress-container full-width">
        <div
            class="progress-bar"
            style:--progress-bar-width="{progressBarWidth}%"
            style:--progress-bar-background-color={progressBarBackgroundColor}
        />
    </div>
    <AddItemBar on:keydown={handleKeydown} />
    <SortOptions {itemKeys} {sortOption} on:click={handleOrderSelection} />
    <div class="left">
        <ItemList
            listHeading="todo"
            {sortOption}
            {sortAsc}
            {send}
            {receive}
            completed={false}
        />
    </div>
    <div class="right">
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

<style>
    :root {
    }
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
    :global(.todo-heading) {
        background-color: hsl(0, 0%, 20%);
        color: hsl(59, 100%, 58%);
        text-transform: uppercase;
        padding: 0.125em;
    }
    :global(.done-heading) {
        background-color: hsl(140, 40%, 50%);
        color: hsl(140, 40%, 95%);
        text-transform: uppercase;
        padding: 0.125em;
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
    .full-width {
        grid-column: 1/3;
    }
    .progress-container {
        background-color: transparent;
        border-radius: 15px;
    }
    .progress-bar {
        width: var(--progress-bar-width);
        height: 1rem;
        background-color: var(--progress-bar-background-color);
        border-radius: 15px;
    }
</style>
