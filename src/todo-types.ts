export interface Task {
    id: number;
    done: boolean;
    description: string;
    createdAt: number;
    modifiedAt: number;
    duration?: number;
}
export interface TaskPoole {
    id: number;
    description: string;
    tasks: Task[];
    duration?: number;
}