function delayFn(time){
    return new Promise(resolve=>{setTimeout(resolve,2000),console.log("Promise");});
}

async function DelayUse(){
    console.log("hi");
    await delayFn(200);
    // setTimeout(delayFn,200)
    console.log("bye");
}

// DelayUse();

////////////////////////////callback////////////
async function demoFn(n){
    await delayFn(200)
    console.log("name is ",n);
    await delayFn(200)
}

async function callbackExm(name,func){
    console.log("going in callback ");
    await func(name);
    console.log("coming back from callback ");

}

callbackExm("m1",demoFn)
