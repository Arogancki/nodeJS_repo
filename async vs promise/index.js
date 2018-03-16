async function async(t){
    console.log("Hello from async start", t);
    await new Promise(r=>{
        console.log("Hello from async inner", t);
        r();
    })
    console.log("Hello from async end", t);
}

async function asyncLong(){
    console.log("async started");
    await async(1);
    console.log("first down");
    await async(2);
    console.log("asyncLong done");
}

function promise(t){
    console.log("Hello from promise start", t);
    return new Promise(r=>{
        console.log('Hello from promise inner', t);
        r();
    }).then(()=>{
        console.log("Hello from promise end", t);
    })
}

function promiseLong(){
    return new Promise(rr=>{
        console.log("promise started");
        sync(1).then(r=>{
            console.log("first down");
            sync(2).then(r=>{
                console.log("promiseLong done");
                rr();
            })
        });
    })
}