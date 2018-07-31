const helper = require('./helper')

module.exports = function test(config){
    describe('data', ()=>{
        describe('post', ()=>{
            it('authenticated user can post data', ()=>
                helper.postData('username1', 'sometext')
            )
            describe('body validation', ()=>{
                it('text is required', (cb)=>
                    helper.postData('username1', '').then((cb)=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                )
                it('text must be at least 3 chars long', (cb)=>
                    helper.postData('username1', '12').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                )
                it('text must not be longer then 100 chars', (cb)=>
                    helper.postData('username1', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \
                    Aenean commodo ligula eget dolor. Aenean ma').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                )
            })
        })
        describe('get', ()=>{
            it('authenticated user can get data', ()=>
                helper.getData('username1')
            )
        })
    })
}