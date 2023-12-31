# qlik

This module facilitates easy integration between Qlik Sense Enterprise/Cloud and web applications by leveraging the Qlik Capability API. Developers can seamlessly connect to multiple Qlik Sense applications and interact with the Qlik Sense API using the utilities provided in this package. [Qlik helper for more details & other API's](https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)

This module provides a set of utilities to streamline the interaction between your web applications and the Qlik Sense API.

## Table of Contents

- [Qlik](#qlik)
    - [Features](#features)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Getting Started](#getting-started)
        - [Configuration Options](#configuration-options)
        - [Example](#example)
    - [Contributing](#contributing)
    - [License](#license)
    - [Contact](#contact)

## Features

- Simplifies connection to Qlik Sense environments
- Facilitates communication with multiple Qlik Sense applications
- Interacts with various Qlik Sense API endpoints
- Enhances development experience with Qlik Sense integrations

## Installation

To install the Qlik Capability API Wrapper, use npm:

```bash
$ npm install qlik -save
```

## Usage
### Getting Started
To utilize this package, provide the basic information required for connecting to the Qlik Sense environment:

```typescript
import Qlik from 'qlik';

// Define your connection to Qlik Sense Server and call the basic methods.

const qlikConfig = {
  host: 'localhost',
  port: 80,
  prefix: '/ticket/',
  isSecure: false,
  ticket: 'qlikTicket=****', // Optional, for dynamic ticket-based authentication
  webIntegrationId: '****',   // Optional, for cloud integration
};

const qlik = new Qlik(qlikConfig);

// For Qlik sense Enterprise
qlik
 .callRequire()
 .then(async (q) => {
  await qlik.setQlik();
  await qlik.setAuthUser();
 })
 .catch((err) => {
  console.log(err);
 });

// For Qlik sense cloud
  qlik
      .callRequire()
      .then(async (q) => {
        await qlik.setQlik();
        await qlik.authenticateToQlik();
        await qlik.setAuthUser();
      })
      .catch((err) => {
        console.log(err);
      });
```
### Configuration Options
- host: The hostname of the Qlik Sense server.
- port: The port number for communication.
- prefix: The prefix for the Qlik Sense API URL.
- isSecure: Boolean indicating whether the connection is secure (HTTPS).
- ticket: (Optional) Qlik dynamic ticket-based authentication. Must be authenticate with particular virtual proxy, when you're not passing.
- webIntegrationId: (Optional) ID for  qlik sense cloud integration

### Example
sample module for react with qlik enterprise.

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
