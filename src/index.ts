import { V3Client } from './client/v3';
import { V4Client } from './client/v4';

export class PricempireClient {
    public readonly v3: V3Client;
    public readonly v4: V4Client;

    constructor(options: {
        apiKey: string;
        baseURL?: string;
    }) {
        this.v3 = new V3Client(options.apiKey, options.baseURL);
        this.v4 = new V4Client(options.apiKey, options.baseURL);
    }
}

export default PricempireClient;
export * from './types';