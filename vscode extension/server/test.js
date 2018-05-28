for (var v of x()) {
    console.log( v );
}
    
    
function * x(y){
    console.log(y)
    yield y
}