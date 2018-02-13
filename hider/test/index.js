const hider = require('hider');
 
let family = {
    father: 'Homer',
    mother: 'Marge',
    kids: {
        son: 'Bart',
        daughter: ['Lisa', 'Maggie']
    }
};

show(family);

hider.hide(family);
show(family);
hider.unhide(family);
show(family);

hider.hide(family, 'father', 'Maggie');
show(family);
hider.unhide(family, 'father', 'Maggie');
show(family);

// hide properties by key
hider.hideByKey(family, 'father', 'daughter', 'neighbour');
show(family);
hider.unhideByKey(family, 'father', 'daughter', 'neighbour');
show(family);

// hide properties by value
hider.hideByVal(family, 'Homer', 'Maggie', 'Ned');
show(family);
hider.unhideByVal(family, 'Maggie', 'Ned');
show(family);

function show(obj, init = true){
    if (init)
        console.log('Family: {')
    for(el in obj)
        if (typeof obj[el] === 'string')
            console.log(obj[el])
        else
            show(obj[el], false)
    if (init)
        console.log('}\n')
}