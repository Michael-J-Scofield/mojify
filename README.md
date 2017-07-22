# Mojify.js

Convert regular text to emojis.

### Installation
```
npm install mojify
```

### Usage

### From the command line
Run the mojify.js from where you have it installed.
```
./mojify.js 'I like this package more then you'
```
Result:
```
I 👩‍❤️‍💋‍👩 this 📦 ➕ then 😀
```

### As node.js module
```javascript
var mojify = require('mojify');

console.log(mojify.convert('I like this package more then you')); //I 👩‍❤️‍💋‍👩 this 📦 ➕ then 😀
```
