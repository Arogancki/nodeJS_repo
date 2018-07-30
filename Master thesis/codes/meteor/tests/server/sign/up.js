const helper = require('../helper')

module.exports = function test(config){
    describe('up', ()=>{
        describe('post', ()=>{
            it('user can sign up', ()=>
                helper.signUp('username1', 'password', 'password')
            )
            describe('body validation', ()=>{
                it('username is required', (cb)=>{
                    helper.signUp('', 'password', 'password').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                })
                it('username must be not taken yet', (cb)=>{
                    helper.signUp('username1', 'password', 'password').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                })
                it('password is required', (cb)=>{
                    helper.signUp('username1', '', 'password').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                })
                it('password and password2 must match', (cb)=>{
                    helper.signUp('username1', 'password', 'password2').then(()=>{
                        throw new error(`this shoudn't happend`)
                    }).catch(()=>{
                        cb()
                    })
                })
            })
        })
        describe('get', ()=>{
            it('get an sign up page', ()=>
                helper.get('/sign/up')
            )
        })
    })
}