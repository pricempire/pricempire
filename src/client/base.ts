import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export class BaseClient {
    protected readonly client: AxiosInstance;

    constructor(apiKey: string, baseURL: string) {
        // Validate API key format (UUID v4)
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidV4Regex.test(apiKey)) {
            throw new Error('Invalid API key format. API key must be a valid UUID v4');
        }

        this.client = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            paramsSerializer: (params) => qs.stringify(params, {
                arrayFormat: 'comma',
                encode: false
            })
        });


        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 401) {
                        throw new Error('Invalid API key. For more information see: https://developers.pricempire.com/');
                    }
                    if (status === 429) {
                        throw new Error('Rate limit exceeded');
                    }
                    throw new Error(data.message || 'An error occurred with the API request');
                }
                throw error;
            }
        );
    }
}