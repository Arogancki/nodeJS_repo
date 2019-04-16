module.exports = class CollectionManager {
    constructor(model) {
        this.model = model
    }
    schemaPathFilter(document){
        if (Array.isArray(document)){
            return document.map(doc=>this.schemaPathFilter(doc))
        }
        if (!document || !(document.schema||{}).paths){
            return document
        }
        const filtered = {}
        Object.keys(document.schema.paths)
        .filter(key=>key!=='_id')
        .forEach(key=>{
            if (Array.isArray(document[key])){
                filtered[key] = document[key].map(doc=>this.schemaPathFilter(doc))
            } else {
                filtered[key] = document[key]
            }
        })
        return filtered
    }
    async create(props){
        return {id: (await this.model.create(props))._id.toString()}
    }
    async createOrUpdate(key, value, props){
        const results = await this.model.updateMany({[key]: value}, props, {upsert: true, new: true})
        const resultDocs = results.upserted || await this.model.find({[key]: value})
        if (!resultDocs){
            return new Error('No documents')
        }
        return resultDocs.length === 1 
        ? resultDocs[0]._id.toString()
        : resultDocs.map(doc=>doc._id.toString())
    }
    async populate(document, key){
        if (!document){
            return document
        }
        else if (Array.isArray(document)){
            await Promise.all(document.map(doc=>this.populate(doc, key)))
        }
        else if (Array.isArray(key)){
            await Promise.all(key.map(k=>this.populate(document, k)))
        } else {
            await this.model.populate(document, key)
        }
        return document
    }
    async getAll(populateOn){
        return this.get(null, null, populateOn)
    }
    async remove(id){
        return this.model.findByIdAndDelete(id)
    }
    async get(key, value, populateOn){
        let results = null
        if (!key){
            results = await this.model.find({})
        }
        else if (key===`id` || key===`_id`){
            results = await this.model.findById(value)
        }
        else {
            results = await this.model.findOne({[key]: value})
        }
        if (populateOn){
            results = await this.populate(results, populateOn)
        }
        if (!results){
            return null
        }
        return {filtered: this.schemaPathFilter(results), results}
    }
}