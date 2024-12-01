import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

export class BaseClient {
    protected readonly client: AxiosInstance;

    constructor(apiKey: string, baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'x-foo': apiKey
            },
            paramsSerializer: (params) => qs.stringify(params, {
                arrayFormat: 'brackets',
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