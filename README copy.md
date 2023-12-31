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
    - [Functions](#functions)
  - [Example](#example)
    - [Enterprise](#enterprise)
    - [Cloud](#cloud)
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
$ npm install qlik --save
```

## Usage

### Getting Started

To utilize this package, provide the basic information required for connecting to the Qlik Sense environment:

Import module

```typescript
import Qlik from "qlik";
```

Define your connection to Qlik Sense Server and call the basic methods.

```typescript
const qlikConfig = {
  host: "localhost",
  port: 80,
  prefix: "/ticket/",
  isSecure: false,
  ticket: "qlikTicket=****", // Optional, for dynamic pass the ticket
  webIntegrationId: "****", // For cloud integration
};

const qlik = new Qlik(qlikConfig);
```

### Configuration Options

- host: The hostname of the Qlik Sense server.
- port: The port number for communication.
- prefix: The prefix for the Qlik Sense API URL.
- isSecure: Boolean indicating whether the connection is secure (HTTPS).
- ticket: (Optional) Qlik dynamic ticket-based authentication. Must be authenticate with particular virtual proxy, when you're not passing.
- webIntegrationId: (Optional) ID for qlik sense cloud integration

## Functions
This module includes the following functions:

#### callRequire:
- Loads the requirejs and qlik-style.css dynamically based on config.
#### setQlik:
- Sets the instance of Qlik once the requirements are loaded.
#### authenticateToQlik:
- Supports authentication for cloud.
#### setAuthUser:
- Retrieves the authenticated user of the current application.
#### getSpaceList, getUserList, getAppList, getThemeList:
- Functions supporting cloud for retrieving lists of spaces, users, apps, and themes respectively.
#### getDocs, getList, getMeasure, getVariable, getFields, getBookmark, getQlikObjectTitles, getSheet, callObject, getApp: 
- Functions supporting enterprise and cloud for retrieving various Qlik objects and data.

## Example

### Enterprise

sample module for react with qlik enterprise.

```typescript
import React, { useState } from "react";
import Qlik from "qlik";
import { Box } from "@mui/material";

import Dashboard from "../components/dashboard";
import Header from "../components/header";

const App: React.FC = () => {
  const [user, setUser] = useState<any>();
  const qlik = new Qlik({
    host: "localhost",
    port: 80,
    prefix: "/ticket/",
    isSecure: false,
    ticket: "qlikTicket=9byYoKhTnv9PP8aq",
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

Before utilizing the Qlik Capability API Wrapper, it's necessary to create a [virtual proxy](https://help.qlik.com/en-US/sense-admin/November2023/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/create-virtual-proxy.htm#:~:text=drop%2Ddown%20menu%20to%20display,the%20Virtual%20proxy%20edit%20window.) in your Qlik Sense environment to configure the prefix and whitelist
the host (localhost) and port (3000).

Explore the sample project [here](https://github.com/ranvithm/qlik/tree/main/example/with-enterprise).

### Cloud

sample module for react with qlik cloud.

```typescript
import React, { useState } from "react";
import Qlik from "qlik";
import { Box } from "@mui/material";

import Dashboard from "../components/dashboard";
import Header from "../components/header";

const App: React.FC = () => {
  const [user, setUser] = useState<any>();
  const qlik = new Qlik({
    host: "domain.name",
    port: 443,
    prefix: "/",
    isSecure: true,
    webIntegrationId: "**YoKhTnv9PP8aq",
  });

  qlik
    .callRequire()
    .then(async (q) => {
      await qlik.setQlik();
      await _qlik.authenticateToQlik();
      await _qlik.setAuthUser();
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

Before utilizing the Qlik Capability API Wrapper, it's necessary to [create a web integration id](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-adminster-web-integrations.htm?_ga=2.178546276.1908556056.1704033907-1088852823.1639579506) in your Qlik Sense environment to configure and whitelist
the host (localhost) and port (3000).

Explore the sample project [here](https://github.com/ranvithm/qlik/tree/main/example/with-cloud).

## Contribution

This library is still under construction and we are looking for contributors.
If you like to contribute please contact me: ranvitranjit@gmail.com

## License

[MIT ©](./LICENSE) [Ranjithkumar M](https://ranvithm.github.io/)
