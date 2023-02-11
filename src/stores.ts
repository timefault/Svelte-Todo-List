import { writable } from 'svelte/store';
import type { Todo } from './todo-types';

let storeContent: string = localStorage.getItem('content');
let initialValue: Todo[] = storeContent ? JSON.parse(storeContent) : [];

export const todoList = writable(initialValue);