import merge from './merge'

it('can merge a few objects', () => {
    expect(merge(
        {a: {a:1, b:1}},
        {a: {a:2, c:'test', d:'2test'}},
        {a: {d:' 3test'}},
        {b: {c:{d:3}}},
        {b: {c:{d:7}}},
    )).toEqual({
        a: {a:3, b:1, c: 'test', d:'2test 3test'},
        b: {c:{d:10}}
    })
})

it('can not merge objects with different prop types', () => {
    expect(()=>merge(
        {a:1},
        {a:''},
    )).toThrow
})