const mongoose = require('mongoose')
    , config = require('../config')
    , CollectionManager = require('./CollectionManager')
    , getLastMidnightTimestamp = require('../helpers/getLastMidnightTimestamp')
    , itemsProvider = require('../helpers/itemsProvider')
    , exchangeRatesProvider = require('../helpers/exchangeRatesProvider')
    , items = new mongoose.Schema({
        timestamp: {
            required: true,
            type: String
        },
        items: [{
            id: String,
            name: String,
            price: Number
        }]
    }, { versionKey: false })

class ItemsManager extends CollectionManager {
    async getTodaysItems() {
        const items = await this.getItemsByTimestamp(getLastMidnightTimestamp())
        if (!items) {
            const fetchedItems = await itemsProvider()
            await super.createOrUpdate("timestamp", fetchedItems.timestamp, {
                items: fetchedItems.items
            })
            return fetchedItems.items
        }
        return items
    }
    async getItemsByTimestamp(timestamp) {
        const data = await this.get('timestamp', timestamp)
        if (!data) {
            return null
        }
        return data.filtered.items
    }
    async getItemsByIds(combinedIds) {
        if (!Array.isArray(combinedIds)) {
            return this.getItemsByIds([combinedIds])
        }
        const combainedItems = combinedIds.reduce((combined, val, key) => {
            const [timestamp, itemId] = val.split('-')
            combined[timestamp] = combined[timestamp] ? [...combined[timestamp], itemId] : [itemId]
            return combined
        }, {})
        const items = (await Promise.all(
            Object.keys(combainedItems).map(timestamp =>
                this.getItemsByTimestamp(timestamp).then(items =>
                    items
                        ? combainedItems[timestamp]
                            .map(itemId => items.find(item => item.id === itemId))
                            .filter(item => item !== undefined)
                            .map(item => ({
                                ...item,
                                id: `${timestamp}-${item.id}`
                            }))
                        : []
                )
            )
        )).reduce((combinedItems, items) => [...combinedItems, ...items], [])
        return {
            items,
            value: await this.getItemsValue(items)
        }
    }
    async getItemsValue(items) {
        const currencyCodes = ["USD", "EUR", "PLN"]
        const rates = (await exchangeRatesProvider()).filter(rate => currencyCodes.includes(rate.code))
        return rates.reduce((values, rate) => {
            const ask = items.reduce((reduced, item) => reduced + item.price / rate.ask, 0)
            const bid = items.reduce((reduced, item) => reduced + item.price / rate.bid, 0)
            values[rate.code] = ((ask + bid) / 2).toFixed(2)
            return values
        }, {})
    }
}

module.exports = new ItemsManager(mongoose.model(config.ITEMS_DATABASE_NAME, items))