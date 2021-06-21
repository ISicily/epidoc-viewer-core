# epidoc-viewer-core

Exports a javascript function for converting epidoc to Leiden: 

convert - a function that takes epidoc and returns Leiden

## Usage

```npm install @isicily/epidoc-viewer-core```

OR

```yarn add @isicily/epidoc-viewer-core```

import {convert} from ‘@isicily/epidoc-viewer-core’

const leiden = convert(tei, handleOpenPopup, showInterpreted, overridingRules)

Where:

- ‘tei’ is the epidoc to be transformed to Leiden.
- ‘showInterpreted’ is a boolean 
	- true shows interpreted, false shows diplomatic
- ‘overridingRules’ is a list of rules to add to the core set, or to override in the core set.  
- 'handleOpenPopup' is a function that is called whenever a popup has to be shown for something in the rendered Leiden, like corrected text.  The function takes one argument - the text to be shown in the popup.

The rules passed in overridingRules must be an object like so:

```javascript
const yourRules = {
    'w': node => {
        if (node.getAttribute('part') === 'I') {
            const exChild = node.querySelector('ex')
            if (exChild) {
                exChild.append('-')
            }
        } 
    },
    'ex': node => {
        const cert = node.getAttribute('cert')
        node.prepend('('); 
        if (cert === 'low') node.append('?')
        node.append(')')
    },
    'abbr': node => {
        if (node.parentNode.nodeName !== 'expan') node.append('(- - -)')
    }
}
```

Only include rules for those tags you wish to add or override.  You can see the default rules in these three files:

[Interpreted](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/rules.js)

[Diplomatic](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/diplomaticRules.js)

[Shared](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/sharedRules.js)

The shared rules are used in both the diplomatic and interpreted modes.

See the code in [LeidenViewer](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/LeidenViewer.js) for working usage.

## Updating this repo in NPM

In project directory:

```
npm run build
npm version patch -m "Upgrade to %s"
git push
npm publish --access public
```