export interface ItemPrice {
    price: number | null;
    count: number | null;
    updated_at: string | null;
    provider_key: string;
    meta?: {
        original_price: number;
        original_currency: string;
        rate: number;
    };
}

export interface ItemPriceResponse {
    market_hash_name: string;
    image: string;
    liquidity: number;
    count: number;
    rank: number;
    prices: ItemPrice[];
}

export interface ItemMeta {
    market_hash_name: string;
    description: string;
    image: string;
    trades_1d: string;
    trades_7d: string;
    trades_30d: string;
    trades_90d: string;
    trades_180d: string;
    rank: string;
    marketcap: string;
    liquidity: string;
    count: string;
    steam_last_90d: string;
    steam_last_30d: string;
    steam_last_7d: string;
    market_first_date: string;
}

export interface V4Options {
    currency?: string;
    sources?: string[];
    app_id?: number;
    avg?: boolean;
    inflation_threshold?: number;
    metas?: string[];
    language?: string;
}