# qlik

This package will serve as a web application's wrapper for the Qlik API. The utilities in the package simplify connecting to Qlik, load necessary dependencies, and give users access to fundamental Qlik methods. Developers can connect to many Qlik Sense applications and communicate with the Qlik Sense API by utilizing these utilities. [Qlik helper for more details & other API's](https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)

## Table of Contents

- [Qlik](#qlik)
    - [Installation](#installation)
    - [Quick Start](#quick-start)
    - [Contributing](#contributing)
    - [License](#license)
    - [Contact](#contact)
## Installation

To install this library, run:

```bash
$ npm install qlik -save
```

## Quick Start

```bash
$ npm install qlik
```

and then from your Angular `App.ts`:

```typescript
import Qlik from 'qlik';

// Define your connection to Qlik Sense Server and call the basic methods.
const qlik = new Qlik({
 host: 'localhost',
 port: 80,
 prefix: '/ticket/',
 isSecure: false,
 ticket: 'qlikTicket=9byYoKhTnv9PP8aq', // optional
});

qlik
 .callRequire()
 .then(async (q) => {
  await qlik.setQlik();
  await qlik.setAuthUser();
 })
 .catch((err) => {
  console.log(err);
 });
```

Once the library is imported, you can use its components in you application:

```typescript
import React, { useState } from 'react';
import Qlik from 'qlik';
import { Box } from '@mui/material';

import Dashboard from '../components/dashboard';
import Header from '../components/header';

const App: React.FC = () => {
 const [user, setUser] = useState<any>();
 const qlik = new Qlik({
  host: 'localhost',
  port: 80,
  prefix: '/ticket/',
  isSecure: false,
  ticket: 'qlikTicket=9byYoKhTnv9PP8aq',
 });

 qlik
  .callRequire()
  .then(async (q) => {
   await qlik.setQlik();
   await qlik.setAuthUser();
   const { user } = qlik;
   setUser(user);
  })
  .catch((err) => {
   console.log(err);
  });

 return (
  <Box>
   <Header user={user} />
   <Dashboard />
  </Box>
 );
};

export default App;
```

## Contribution

This library is still under construction and we are looking for contributors.
If you like to contribute please contact me: ranvitranjit@gmail.com

## License

[MIT ©](./LICENSE) [Ranjithkumar M](https://ranvithm.github.io/)
