import { PricempireClient } from "@pricempire/api";

const client = new PricempireClient({
    apiKey: 'YOUR_API_KEY'
});

// V3 API examples
const items = await client.v3.getAllItems({
    currency: 'USD',
    sources: ['buff', 'steam']
});

const inventory = await client.v3.getInventory({
    steamId: '76561198000000000',
    sources: ['buff'],
    currency: 'USD'
});

// V4 API examples
const prices = await client.v4.getPrices({
    currency: 'USD',
    sources: ['buff163', 'steam']
});

const metas = await client.v4.getItemMetas();