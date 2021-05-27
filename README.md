# epidoc-viewer-core

Exports a react component and a pure javascript function for converting epidoc to Leiden: 

LeidenViewer - a react component that will display rendered Leiden when passed epidoc.

convert - a function that takes epidoc and returns Leiden

The LeidenViewer uses the convert function under the covers, but you can also use the convert function directly without react.

## Usage

```npm install @isicily/epidoc-viewer-core```

OR

```yarn add @isicily/epidoc-viewer-core```

### React component

import {LeidenViewer} from ‘@isicily/epidoc-viewer-core’

then use it somewhere...

```<LeidenViewer 
		tei={tei} 
		showInterpreted={false} 
		overridingRules={someRules} 
/>```
  
Where:

- ‘tei’ is the epidoc to be transformed to Leiden.
- ‘showInterpreted’ is a boolean 
	- true shows interpreted, false shows diplomatic
- ‘overridingRules’ is a list of rules to add to the core set, or to override in the core set.  

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

### convert.js

This is the pure javascript that underpins the React component.  Use it like so:

import {convert} from ‘@isicily/epidoc-viewer-core’

const leiden = convert(tei, handleOpenPopup, showInterpreted, overridingRules)

where ‘tei’, ‘showInterpreted’, and ‘overridingRules’ take the same arguments as those passed as props to the LeidenViewer component described above.

The 'handleOpenPopup' is a function that is called whenever a popup has to be shown for something in the rendered Leiden, like corrected text.  The function takes one argument - the text to be shown in the popup.

See the code in [LeidenViewer](https://github.com/ISicily/epidoc-viewer-core/blob/master/src/LeidenViewer.js) for working usage.

## Updating this repo in NPM

```
npm version patch -m "Upgrade to %s"
git push
npm publish --access public
```