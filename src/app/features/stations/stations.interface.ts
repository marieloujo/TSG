export interface Station {
    id: string;
    name: string;
    type: string;
    status: 'available' | 'in_use' | 'maintenance';
}
