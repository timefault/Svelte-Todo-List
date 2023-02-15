<script lang="ts">
    import TaskPoolComponent from "./TaskPoolComponent.svelte";

    let taskPool;

    let status = "not started";

    type Task = {
        description: string;
        duration: number;
    };
    type TaskPool = {
        description: string;
        duration: number;
        tasks: Task[];
    };
    const pool: TaskPool = {
        description: "",
        duration: 0,
        tasks: [],
    };

    function parseDuration(input: string): number {
        return 1000 * 20;
    }
    function handleClick(e: Event) {
        status = "beginning";
        setTimeout(() => taskPool.focus(), 0);
    }
    function handleKeydown(e: Event): void {
        let keyEvent = e as KeyboardEvent;
        switch (keyEvent.key) {
            case "Enter":
                if (status === "not started") {
                    status = "beginning";
                } else if (status === "beginning") {
                    createPool(e.target);
                    status = "not started";
                }
                break;
            case "Escape":
                console.log("Escape");
                stepBack();
                break;
            default:
        }
    }
    function createPool(input) {
        // set pool and display todo list
        pool.duration = parseDuration(input.value);
        let props = {
            id: 0,
            description: "test",
            tasks: [],
            duration: pool.duration,
        };
        const newPool = new TaskPoolComponent({
            target: document.body,
            props: props,
        });
        return newPool;
    }
    function stepBack() {
        status = "not started";
    }
</script>

<!--//////////////////// T E M P L A T E /////////////////////  -->
<div class="container">
    {#if status === "not started"}
        <button on:click={handleClick} on:keydown={handleKeydown}>+</button>
    {:else if status === "beginning"}
        <input
            placeholder="how much time is available?"
            type="text"
            bind:this={taskPool}
            on:keydown={handleKeydown}
        />
    {/if}
</div>

<!--//////////////////////////////////////////////////////////  -->
<style></style>
