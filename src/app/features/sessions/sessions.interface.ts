export interface Session {
    id: string;
    player_id: string;
    station_id: string;
    start_time: string;
    end_time: string;
    duration: number;
    cost: string;
    is_active: boolean;
}
