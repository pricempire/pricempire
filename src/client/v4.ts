import { BaseClient } from './base';
import { ItemPriceResponse, ItemMeta, V4Options } from '../types';

export class V4Client extends BaseClient {
    constructor(apiKey: string, baseURL?: string) {
        super(apiKey, baseURL || 'https://api.pricempire.com/v4/paid');
    }

    async getPrices(options: V4Options = {}): Promise<ItemPriceResponse[]> {
        const { data } = await this.client.get('/items/prices', {
            params: {
                currency: options.currency || 'USD',
                sources: options.sources || ['buff163', 'steam'],
                app_id: options.app_id || 730,
                avg: options.avg || false,
                inflation_threshold: options.inflation_threshold || 30,
                metas: options.metas || []
            }
        });
        return data;
    }

    async getItemMetas(): Promise<ItemMeta[]> {
        const { data } = await this.client.get('/items/metas');
        return data;
    }

    async getItems(options: V4Options = {}): Promise<any> {
        const { data } = await this.client.get('/items', {
            params: {
                language: options.language || 'en'
            }
        });
        return data;
    }

    async getItemImages(): Promise<Record<string, { steam: string; cdn: string }>> {
        const { data } = await this.client.get('/items/images');
        return data;
    }
}