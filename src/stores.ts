import { writable } from 'svelte/store';
import type { Task } from './todo-types';

let storeContent: string = localStorage.getItem('content');
let initialValue: Task[] = storeContent ? JSON.parse(storeContent) : [];

export const todoList = writable(initialValue);