# qlik

This package to be wrapper the qlik API with web application. This utils handle the qlik connection, loading the require and and get the basic qlik methods.And using this utils we can connect the qlik sense multiple app, And access the qlik sense api also. [API reference](https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)

A working example of the react project can be seen at https://github.com/ranvithm/react-qlik/

This typescript project was generated with [Create-react-app](https://reactjs.org/docs/static-type-checking.html#using-typescript-with-create-react-app) version 18.2.0

<!-- ###### Qlik Classes
- [Global](docs/Global.md)
- [Doc](docs/Doc.md)
- [Bookmark](docs/Bookmark.md)
- [Field](docs/Field.md)
- [GenericDimension](docs/GenericDimension.md)
- [GenericMeasure](docs/GenericMeasure.md) -->

## Installation

To install this library, run:

```bash
$ npm install qlik -save
```

## Example

```bash
$ npm install qlik
```

and then from your Angular `App.ts`:

```typescript
import Qlik from 'qlik';

// Define your connection to Qlik Sense Server
const qlikConfig = new Qlik({
    host: 'localhost',
    port: 80,
    prefix: '/tkt/',
    isSecure: false
});

```

Once the library is imported, you can use its components in you application:

```typescript
console.log(qlikConfig)
```

## Development Progress

- [x] Dynamic Load require
- [x] Global API
- [x] Get App list
- [x] App API
- [x] Bookmark Methods
- [x] Dimension Methods
- [x] Evaluate expression Methods
- [x] Measure Methods
- [x] Field Methods
- [x] Variable Methods
 

## Contribution
This library is still under construction and we are looking for contributors. 
If you like to contribute please contact me: ranvitranjit@gmail.com

## License

[MIT ©](./LICENSE) [Ranjithkumar M](https://ranvithm.github.io/)