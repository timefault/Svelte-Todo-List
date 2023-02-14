export interface Task {
    id: number;
    done: boolean;
    description: string;
    createdAt: number;
    modifiedAt: number;
    duration?: number;
}