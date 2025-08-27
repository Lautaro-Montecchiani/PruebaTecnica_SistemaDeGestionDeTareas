export declare class AnalyticsController {
    getPersonalAnalytics(req: any, timeframe: string): {
        personalStats: {
            total: number;
            completed: number;
            pending: number;
            inProgress: number;
            overdue: number;
            completionRate: number;
        };
    };
    getAdminAnalytics(req: any, query: any): {
        personalStats: {
            total: number;
            completed: number;
            pending: number;
            inProgress: number;
            overdue: number;
            completionRate: number;
        };
    };
}
