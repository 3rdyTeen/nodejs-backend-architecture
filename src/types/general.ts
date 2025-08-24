export type OverrideIdAndDates<TTable> = Omit<TTable, 'id' | 'createdAt' | 'updatedAt'> & {
    id: string;
    createdAt: Date | string;
    updatedAt: Date | string | null;
};