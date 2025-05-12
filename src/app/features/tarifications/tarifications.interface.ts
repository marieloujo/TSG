export interface Tarification {
    id: string;
    station_type: string;
    description: string;
    hourly_rate: number;
    created_by: string;
    created_by_username: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}
