import { writable } from 'svelte/store';
import { getUID } from './utility';

export const todoList = writable([
    { id: getUID(), done: false, description: "write some docs" },
    { id: getUID(), done: false, description: "start writing blog post" },
    { id: getUID(), done: true, description: "buy some milk" },
    { id: getUID(), done: false, description: "mow the lawn" },
    { id: getUID(), done: false, description: "feed the turtle" },
    { id: getUID(), done: false, description: "fix some bugs" },
]);