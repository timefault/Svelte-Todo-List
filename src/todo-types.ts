export interface Task {
    id: number;
    done: boolean;
    description: string;
    createdAt: number;
    modifiedAt: number;
    duration?: number;
}
export interface TaskPool {
    id: number;
    description: string;
    tasks: Task[];
    duration?: number;
}