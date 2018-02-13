# hider
Hides all or selected object properties for some time.

### Usage
```js
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
// Family: Homer Marge Bart Lisa Maggie
// hide all enumerable properties
hider.hide(family);
show(family);
// Family:
// unhide all previously hidden properties
hider.unhide(family);
show(family);
// Family: Homer Marge Bart Lisa Maggie

// hide properties by key or value
hider.hide(family, 'father', 'Maggie');
// Family: Marge Bart Lisa
hider.unhide(family, 'father', 'Maggie');
// Family: Homer Marge Bart Lisa Maggie

// hide properties by key
hider.hideByKey(family, 'father', 'daughter');
// Family: Marge Bart
hider.unhideByKey(family, 'father', 'daughter');
// Family: Homer Marge Bart Lisa Maggie

// hide properties by value
hider.hideByVal(family, 'Homer', 'Maggie');
// Family: Marge Bart Lisa
hider.unhideByVal(family, 'Homer');
// Family: Homer Marge Bart Lisa
```