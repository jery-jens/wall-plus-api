export interface IConfig {
    apiKey: string;
    apiUrl: string;
    apiUserAgent: string;
    apiOrigin: string;
};

export const Config: IConfig = {
    apiKey: String(process.env.API_KEY),
    apiUrl: String(process.env.API_URL),
    apiUserAgent: String(process.env.API_USER),
    apiOrigin: String(process.env.API_ORIGIN),
};