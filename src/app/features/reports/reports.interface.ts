export interface Report {
    id: string;
    total_revenue: number;
    details: {
        date: string;
        revenue: number;
    }[];
}

export interface SessionReport {
    total_sessions: number;
    average_duration: number;
    details: {
        date: string;
        sessions_count: number;
        average_duration: number;
    }[];
}
