<script></script>

<!-- ///////////////////// T E M P L A T E ///////////////////// -->
<div class="action-container">
    <input class="add-item-bar action-bar" placeholder="task" on:keydown />
    <input class="duration-bar action-bar" placeholder="duration" on:keydown />
</div>

<!-- ////////////////////////////////////////////////////////// -->
<style>
    :root {
        --roundness: 20px;
    }
    .action-container {
        margin: 0 auto;
        max-width: 40%;
    }
    .action-bar {
        font-size: 1.4em;
        padding: 0.125em;
        max-width: 50%;
    }
    .add-item-bar {
        padding-inline-end: 1em;
        border-radius: var(--roundness) 0 0 var(--roundness);
        margin-inline-end: -0.125em;
        text-align: right;
    }
    .duration-bar {
        padding-inline-start: 1em;
        border-radius: 0 var(--roundness) var(--roundness) 0;
        margin-inline-start: -0.125em;
    }
</style>
