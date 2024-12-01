export interface V3ItemPrice {
    price: number;
    count?: number;
    updated_at: string;
    source: string;
}

export interface V3Item {
    market_hash_name: string;
    prices: V3ItemPrice[];
    marketcap?: number;
}

export interface V3InventoryItem {
    asset_id: string;
    d: string;
    float_value?: number;
    paint_seed?: number;
    stickers?: Array<{
        name: string;
        slot: number;
        wear?: number;
        stickerId?: number;
    }>;
    item: {
        market_hash_name: string;
        category: string;
        type: string;
        rarity: string;
        rarity_color: string;
        image: string;
    };
}

export interface V3Inventory {
    id: string;
    value: number;
    created_at: string;
    items: V3InventoryItem[];
}

export interface V3Options {
    currency?: string;
    sources?: string[];
    appId?: number;
    marketcap?: boolean;
}

export interface V3InventoryOptions {
    steamId: string;
    sources: string[];
    currency?: string;
    appId?: number;
    sparkline?: boolean;
    cached?: boolean;
}