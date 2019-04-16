const mongoose = require('mongoose')
    , randomInt = require('random-int')
    , config = require('../config')
    , CollectionManager = require('./CollectionManager')
    , ItemsManager = require('./ItemsManager')
    , getLastMidnightTimestamp = require('../helpers/getLastMidnightTimestamp')
    , zombies = new mongoose.Schema({
        name: {
            required: true,
            type: String
        },
        items: [{
            type: String,
            default: []
        }]
    }, { versionKey: false, timestamps: true })

class ZombiesManager extends CollectionManager {
    async addItem(zombieId, itemId) {
        itemId = `${getLastMidnightTimestamp()}-${itemId}`
        const item = (await ItemsManager.getItemsByIds(itemId)).items[0]
        if (!item) {
            throw new Error('item not found')
        }
        const tryUpdate = async (zombieId, itemId, timesAlreadyCalled=0) => {
            const session = await mongoose.startSession()
            try {
                session.startTransaction()
                const zombie = await this.model.findById(zombieId, null, { session: session })
                if (!zombie) {
                    throw new Error('zombie not found')
                }
                if (zombie.items.length >= 5) {
                    throw new Error('zombie has reached a maximum amount of items')
                }
                const result = await this.model.updateOne({
                    _id: zombieId
                }, {
                        $push: {
                            items: itemId
                        }
                    }, { session: session })
                await session.commitTransaction()
                session.endSession()
                return !!(result.nModified)
            }
            catch (err) {
                await session.abortTransaction()
                session.endSession()
                if (err.message === "WriteConflict" && timesAlreadyCalled < config.MAX_TRANSACTION_CALLS) {
                    return new Promise(res => setTimeout(() => res(tryUpdate(zombieId, itemId, timesAlreadyCalled + 1)), randomInt(10, 100)))
                }
                throw err
            }
        }
        return tryUpdate(zombieId, itemId)
    }
    async removeItem(zombieId, itemId) {
        const session = await mongoose.startSession()
        try {
            session.startTransaction()
            const zombie = await this.model.findById(zombieId, null, { session: session })
            if (!zombie) {
                throw new Error('zombie not found')
            }
            const index = zombie.items.indexOf(itemId)
            if (!~index) {
                throw new Error('zombie does not has this item')
            }
            zombie.items.splice(index, 1)
            const result = await this.model.updateOne({
                _id: zombieId
            }, {
                    items: zombie.items
                }, { session: session })
            await session.commitTransaction()
            session.endSession()
            return !!(result.nModified)
        }
        catch (err) {
            await session.abortTransaction()
            throw err
        }
    }
    async getAll() {
        const data = await super.getAll()
        if (!data) {
            return []
        }
        const items = await Promise.all(data.results.map(zombie =>
            ItemsManager.getItemsByIds(zombie.items)
        ))
        data.filtered.forEach((zombie, index) => {
            zombie.id = data.results[index]._id.toString()
            zombie.items = items[index]
        })
        return data.filtered
    }
    async getWithItems(id) {
        const data = await super.get('_id', id)
        if (!data) {
            throw new Error("zombie not found")
        }
        data.filtered.items = await ItemsManager.getItemsByIds(data.filtered.items)
        return data.filtered
    }
}

module.exports = new ZombiesManager(mongoose.model(config.ZOMBIES_DATABASE_NAME, zombies))