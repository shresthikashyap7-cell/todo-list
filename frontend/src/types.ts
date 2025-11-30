export interface Note {
    title: string;
    description: string;
    status: 'pending' | 'complete';
    _id?: string;
}