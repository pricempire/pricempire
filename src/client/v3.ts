import { BaseClient } from './base';
import { V3Options, V3InventoryOptions } from '../types';

export class V3Client extends BaseClient {
    constructor(apiKey: string, baseURL?: string) {
        super(apiKey, baseURL || 'https://pricempire.com/api-data/v3');
    }

    /**
     * Get all item prices
     */
    async getAllItems(options: V3Options = {}) {
        const { data } = await this.client.get('/getAllItems', {
            params: {
                currency: options.currency || 'USD',
                sources: options.sources || ['buff'],
                appId: options.appId || 730,
                marketcap: options.marketcap || false
            }
        });
        return data;
    }

    /**
     * Get basic item data
     */
    async getBasicData(appId: number = 730) {
        const { data } = await this.client.get('/item_data', {
            params: { appId }
        });
        return data;
    }

    /**
     * Get advanced item data (Enterprise only)
     */
    async getAdvancedData(appId: number = 730) {
        const { data } = await this.client.get('/items/advanced', {
            params: { appId }
        });
        return data;
    }

    /**
     * Get price histories
     */
    async getPriceHistories(options: {
        source?: string;
        days?: number;
        appId?: number;
        currency?: string;
    } = {}) {
        const { data } = await this.client.get('/getPriceHistories', {
            params: {
                source: options.source || 'buff',
                days: options.days || 30,
                app_id: options.appId || 730,
                currency: options.currency || 'USD'
            }
        });
        return data;
    }

    /**
     * Get inventory data
     */
    async getInventory(options: V3InventoryOptions) {
        if (!options.steamId) {
            throw new Error('Steam ID is required');
        }

        if (!options.sources || !options.sources.length) {
            throw new Error('At least one source is required');
        }

        const { data } = await this.client.get(`/inventory/${options.steamId}`, {
            params: {
                sources: options.sources,
                currency: options.currency || 'USD',
                appId: options.appId || 730,
                sparkline: options.sparkline || false,
                cached: options.cached || false
            }
        });
        return data;
    }

    /**
     * Get structured items data
     */
    async getStructuredItems(options: {
        appId?: number;
        limit?: number;
        page?: number;
    } = {}) {
        const { data } = await this.client.get('/items/structured', {
            params: {
                appId: options.appId || 730,
                limit: options.limit || 1000000,
                page: options.page || 1
            }
        });
        return data;
    }

    /**
     * Get item IDs (e.g., Buff IDs)
     */
    async getItemIds(key: string = 'buffId', appId: number = 730) {
        const { data } = await this.client.get('/items/ids', {
            params: {
                type: key,
                app_id: appId
            }
        });
        return data;
    }

    /**
     * Get self inventory
     */
    async getSelfInventory(currency: string = 'USD') {
        const acceptedCurrencies = [
            'USD', 'EUR', 'RUB', 'GBP', 'PLN', 'BRL', 'UAH', 'KZT',
            'INR', 'KRW', 'CAD', 'JPY', 'CNY', 'IDR', 'PHP', 'THB',
            'VND', 'MYR', 'MXN', 'ARS', 'CLP', 'PEN', 'COP'
        ];

        if (!acceptedCurrencies.includes(currency)) {
            throw new Error('Invalid currency. For more information see: https://developers.pricempire.com/');
        }

        const { data } = await this.client.get('/inventory', {
            params: { currency }
        });
        return data;
    }
}