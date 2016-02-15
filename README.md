# local-lib

Node.js `require` your local module files/modules easily from anywhere in
your project without having to navigate directories.

**Problem**

```javascript
	var db = require('../../../../lib/some-module');
```

**Solution**

```javascript
    // do this just one time in the root file (i.e. index.js)
	require('local-module')('lib', 'utils');
	
	// then in any other file just do it.
	var lib = require('localModule');
	// them all your local modules inside in this diretories ('lib' or 'utils')
	// is avaliable in the following way
	var someModule = lib.some_module
```


## Installation

	npm install local-module --save


## Usage

1. in the root file of your projecy require 'local-module' given a directory or a list of directories as parameters, and all your modules inside this diretories will be loaded.
2. then access your library easily using i.e require('local-module').myModule

Library folders should contain an `index.js` to export your library,
or a `package.json` file with a `main` directive to point to your main file.


## Example

**project structure**

	project root
	├── lib
	│   ├── driver
	│   │   └── index.js
	│   └── db.js
	└── app.js
	another-project
	├── lib
    │   ├── utils
	│   │   └── index.js
    └── index.js

**app.js**

```javascript
	const lib   = require('local-module')('lib', '../another-project/lib'),
	      db    = require('./lib/db'),
	      utils = lib.utils;
```

or

```javascript
    require('local-module')('lib', '../another-project/lib');
    
	const db    = require('./lib/db'),
	      utils = require('local-module').utils;
```


**./lib/db.js**

```javascript
	const lib       = require('local-module'),
	      driver    = lib.driver,
	      utils     = lib.utils;
```

or

```javascript
	const driver    = require('local-lib').db,
	      utils     = require('local-lib').utils;
```