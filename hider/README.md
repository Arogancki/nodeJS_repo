# hider
Hides all or selected object properties for some time.

### Usage
```js
const hider = require('hider);
 
let family = {
    father: 'Homer',
    mother: 'Marge',
    kids: {
        son: 'Bart',
        daughter: ['Lisa', 'Maggie']
    },
    show: function show(){
        for(el in this)
            if (typeof this[el] === 'string')
                console.log(this[el])
            else
                show.call(this[el])
    }
};
family.show();  
console.log("\n")  
  
// hide all enumerable properties
hider.hide(family);
family.show();
console.log("\n")
  
// unhide all previously hid properties
hider.unhide(family)
family.show();
console.log("\n")
  
// hide properties by key or value
hider.hide(family, 'father', 'Maggie')
hider.unhide(family, 'father', 'Maggie')
  
// hide properties by key
hider.hideByKey(family, 'father', 'daughter')
hider.unhideByKey(family, 'father', 'daughter')
  
// hide properties by value
hider.hideByVal(family, 'Homer', 'Maggie')
hider.unhideByVal(family, 'Homer', 'Maggie')
  
// arguments can be passed 
// as an array or separated variables
hider.hide(family, ['father', 'Maggie'])
hider.unhide(family, 'father', 'Maggie')
```