<script lang="ts">
    // present duration as list of buttons, some fast convenient input method
    let taskPoole;
    let taskDescription;
    let taskDuration;
    let tasks = [];

    let status = "beginning";

    type Task = {
        description: string;
        duration: number;
    };
    type TaskPool = {
        description: string;
        duration: number;
        tasks: Task[];
    };
    const pool = {
        description: "",
        duration: 0,
        tasks: [],
    };

    function parseDuration(input: string): number {
        return 1;
    }
    function handleKeydown(e: Event): void {
        let keyEvent = e as KeyboardEvent;
        switch (keyEvent.key) {
            case "Enter":
                if (status === "beginning") {
                    setPool(e.target);
                } else {
                    let textbox = e.target as HTMLInputElement;
                    if (textbox.classList.contains("task-description")) {
                        taskDuration.focus();
                    } // taskDuration is selected
                    else addTaskToPool();
                }
                break;
            case "Escape":
                console.log("Escape");
                stepBack();
                break;
            default:
        }
    }
    function setPool(input) {
        status = "next";
        pool.description = new Date().toDateString();
        pool.duration = parseDuration(input.value);
        input.value = "";
        setTimeout(() => {
            taskDescription.focus();
        }, 0);
    }
    function addTaskToPool() {
        console.log("[!]", taskDescription === "input.task-description");
        pool.tasks.push({
            description: taskDescription.value,
            duration: taskDuration.value,
        });
    }
    function stepBack() {
        status = "beginning";
        setTimeout(() => {
            taskPoole.focus();
        }, 0);
    }
</script>

<!--//////////////////// T E M P L A T E /////////////////////  -->
<div class="container">
    {#if status === "beginning"}
        <input
            placeholder="how much time is available?"
            type="text"
            bind:this={taskPoole}
            on:keydown={handleKeydown}
        />
    {:else}
        <input
            type="text"
            class="task-description"
            placeholder="task description"
            bind:this={taskDescription}
            on:keydown={handleKeydown}
        />
        <input
            type="text"
            placeholder="task duration"
            bind:this={taskDuration}
            on:keydown={handleKeydown}
        />
    {/if}
</div>

<!--//////////////////////////////////////////////////////////  -->
<style></style>
