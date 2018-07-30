const helper = require('../helper')

module.exports = function test(config){
    describe('in', ()=>{
        describe('post', ()=>{
            it('user can sign in', ()=>
                helper.signIn('username1', 'password')
            )
            describe('body validation', ()=>{
                it('username has to be valid', (cb)=>
                    helper.signIn('', 'password').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                )
                it('password has to be valid', (cb)=>
                    helper.signIn('username1', '').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                )
            })
        })
        describe('get', ()=>{
            it('user can get sign in page', ()=>
                helper.get('/sign/in')
            )
        })
    })
}