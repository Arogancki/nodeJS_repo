process.env.NODE_ENV = 'test'

const app = require('../app')
    , mongoose = require('mongoose')
    , agent = require('supertest').agent
    , itemsManager = require('../models/ItemsManager')
    , zombiesManager = require('../models/ZombiesManager')
    , should = require('should')
    , config = {}
    , getLastMidnightTimestamp = require('../helpers/getLastMidnightTimestamp')

function ensureConnection() {
    return new Promise(res => {
        const mc = mongoose.connection
        mc.on('open', () => res(mc.db))
        mc.db && res(mc.db)
    })
}

function cleanDatabase() {
    return new Promise(res => mongoose.connection.db.dropDatabase(res))
}

describe('Testing service', () => {
    before(async () => {
        await ensureConnection()
        await cleanDatabase()
        const express = await app()
        config.server = express.server
        config.app = express.app
    })

    describe(`e2e`, () => {

        it(`Fetching not existing route returns 404`, async () => {
            await agent(config.app)
                .get('/this_should_fail')
                .expect(404)
        })

        describe(`/items`, () => {
            describe(`GET`, () => {
                it('getting todays items', async () => {
                    should.equal(await itemsManager.getItemsByTimestamp(getLastMidnightTimestamp()), null)
                    const data = await agent(config.app)
                        .get('/items')
                        .expect(200)
                    data.body.length.should.be.Number().greaterThan(0)
                    data.body.length.should.be.eql((await itemsManager.getItemsByTimestamp(getLastMidnightTimestamp())).length)
                })
            })
        })

        describe(`/zombies`, () => {
            describe(`PUT`, () => {
                it('create a new zombie', async () => {
                    (await zombiesManager.getAll()).length.should.be.eql(0)
                    const data = await agent(config.app)
                        .put('/zombies')
                        .send({
                            name: "random_name",
                        })
                        .expect(200);
                    (await zombiesManager.get('_id', data.body.id)).results.id.should.be.eql(data.body.id)
                })
                it('name validation works properly', async () => {
                    await agent(config.app)
                        .put('/zombies')
                        .send({
                        })
                        .expect(400);
                    await agent(config.app)
                        .put('/zombies')
                        .send({
                            name: null
                        })
                        .expect(400);
                    await agent(config.app)
                        .put('/zombies')
                        .send({
                            name: ""
                        })
                        .expect(400);
                    await agent(config.app)
                        .put('/zombies')
                        .send({
                            name: "very long string xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        })
                        .expect(400);
                })
            })
            describe(`/:id`, () => {
                it('zombie validation works', async () => {
                    await agent(config.app)
                        .get(`/zombies/not_existing`)
                        .expect(400)
                    await agent(config.app)
                        .get(`/zombies/6cb1db2ba471843f5cd0ea5a`)
                        .expect(404)
                })
                describe(`/item`, () => {
                    describe(`PUT`, async () => {
                        it('add a new item to zombie', async () => {
                            const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                            zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                            const items = await itemsManager.getTodaysItems()
                            const timestamp = getLastMidnightTimestamp()
                            items.length.should.be.Number().greaterThan(0)
                            const itemId = items[0].id
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: itemId
                                })
                                .expect(200);
                            const { results } = (await zombiesManager.get('_id', zombieId))
                            results.id.should.be.eql(zombieId)
                            results.items.length.should.be.Number().greaterThan(0)
                            results.items[0].should.be.eql(`${timestamp}-${itemId}`)
                        })
                        it('zombie can not have more then 5 items', async () => {
                            const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                            zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                            const items = await itemsManager.getTodaysItems()
                            items.length.should.be.Number().greaterThan(0)
                            const itemId = items[0].id
                            const addNewItem = itemId => agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: itemId
                                })
                            await Promise.all(Array(6).fill(null).map(() => addNewItem(itemId)))
                            const { results } = (await zombiesManager.get('_id', zombieId))
                            results.id.should.be.eql(zombieId)
                            results.items.length.should.not.be.eql(6)
                        })
                        it('item validation works', async () => {
                            const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                            zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .expect(400);
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: ''
                                })
                                .expect(400);
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: 'invalid'
                                })
                                .expect(400);
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: -1
                                })
                                .expect(400);
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: 51
                                })
                                .expect(404);
                            await agent(config.app)
                                .put(`/zombies/${zombieId}/item`)
                                .send({
                                    id: 99999999999999999
                                })
                                .expect(400);
                        })
                    })
                    describe(`DELETE`, () => {
                        it('item can be removed from a zombie', async () => {
                            const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                            zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                            const items = await itemsManager.getTodaysItems()
                            items.length.should.be.Number().greaterThan(0)
                            const timestamp = getLastMidnightTimestamp()
                            await zombiesManager.addItem(zombieId, items[0].id)
                            await zombiesManager.addItem(zombieId, items[0].id)
                            await zombiesManager.addItem(zombieId, items[1].id)
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .send({
                                    id: `${timestamp}-${items[0].id}`
                                })
                                .expect(200);
                            const { results } = (await zombiesManager.get('_id', zombieId))
                            results.id.should.be.eql(zombieId)
                            results.items.length.should.be.eql(2)
                            results.items[0].should.be.eql(`${timestamp}-${items[0].id}`)
                            results.items[1].should.be.eql(`${timestamp}-${items[1].id}`)
                        })
                        it('item validation works', async () => {
                            const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                            zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                            const timestamp = getLastMidnightTimestamp()
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .expect(400);
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .send({
                                    id: ``
                                })
                                .expect(400);
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .send({
                                    id: `0-1`
                                })
                                .expect(404);
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .send({
                                    id: `${timestamp}-${54}`
                                })
                                .expect(404);
                            await agent(config.app)
                                .delete(`/zombies/${zombieId}/item`)
                                .send({
                                    id: `${timestamp}-${3}`
                                })
                                .expect(404);
                        })
                    })
                })
                describe(`GET`, () => {
                    it('can get a zombie with his items and their value', async () => {
                        const name = 'super Tester'
                        const { id: zombieId } = await zombiesManager.create({ name })
                        zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                        const items = await itemsManager.getTodaysItems()
                        items.length.should.be.Number().greaterThan(0)
                        const timestamp = getLastMidnightTimestamp()
                        await zombiesManager.addItem(zombieId, items[0].id)
                        await zombiesManager.addItem(zombieId, items[1].id)
                        const data = await agent(config.app)
                            .get(`/zombies/${zombieId}`)
                            .expect(200);
                        data.body.name.should.be.eql(name)
                        data.body.items.items.length.should.be.eql(2)
                        data.body.items.value.PLN.should.be.equal((items[0].price + items[1].price).toFixed(2).toString())
                        data.body.items.items[0].id.should.be.eql(`${timestamp}-${items[0].id}`)
                        data.body.items.items[1].id.should.be.eql(`${timestamp}-${items[1].id}`)
                    })
                })
                describe(`DELETE`, () => {
                    it('can delete a zombie', async () => {
                        const { id: zombieId } = await zombiesManager.create({ name: 'tester' })
                        zombieId.should.be.String().and.has.property('length').not.be.eql(0)
                        await agent(config.app)
                            .delete(`/zombies/${zombieId}`)
                            .expect(200);
                        const zombie = (await zombiesManager.get('_id', zombieId))
                        should.equal(zombie, null)
                    })
                })
            })
            describe(`GET`, () => {
                it('can get all zombies', async () => {
                    await zombiesManager.create({ name: 'tester' })
                    await zombiesManager.create({ name: 'tester2' })
                    const dataWithZombies = await agent(config.app)
                        .get(`/zombies`)
                        .expect(200);
                    const allZombies = await zombiesManager.getAll()
                    allZombies.length.should.equal(dataWithZombies.body.length)
                    allZombies.map(zombie => dataWithZombies.body.find(fetchedZombie => fetchedZombie.id === zombie.id))
                        .should.be.Array().not.containEql(undefined)
                    await cleanDatabase()
                    const dataWithouZombies = await agent(config.app)
                        .get(`/zombies`)
                        .expect(200);
                    dataWithouZombies.body.length.should.be.equal(0)
                })
            })
        })
    })

    after(async () => {
        await cleanDatabase()
        config.server.close()
    })
})