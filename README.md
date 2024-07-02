# qlik

This module facilitates easy integration between Qlik Sense Enterprise/Cloud and web applications by leveraging the Qlik Capability API. Developers can seamlessly connect to multiple Qlik Sense applications and interact with the Qlik Sense API using the utilities provided in this package. [Qlik helper for more details & other API's](https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)

This module provides a set of utilities to streamline the interaction between your web applications and the Qlik Sense API.

## Table of Contents

- [Qlik](#qlik)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Advanced Usage](#advanced-usage)
  - [API Documentation](#api-documentation)
  - [Example](#example)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Simplifies connection to Qlik Sense environments
- Facilitates communication with multiple Qlik Sense applications
- Interacts with various Qlik Sense API endpoints
- Enhances development experience with Qlik Sense integrations

## Installation

To install the Qlik Capability API Wrapper, use npm:

```bash
$ npm install qlik
```

```bash
$ yarn add qlik
```

## Configuration

Create a configuration object with the following properties:

- host (string): The hostname of your Qlik Sense instance.
- port (string | number): The port number to connect to Qlik Sense.
- prefix (string): The prefix for the Qlik Sense resources (default: /).
- isSecure (boolean): Whether to use HTTPS (default: true).
- ticket (string, optional): Ticket for authentication.
- webIntegrationId (string, optional): Web integration ID for Qlik Sense SaaS.

### Example configuration:

```ts
const config = {
  host: "your-qlik-sense-host",
  port: 443,
  prefix: "/",
  isSecure: true,
  ticket: "your-ticket",
  webIntegrationId: "your-web-integration-id",
};
```

## Usage

### Initialization

Import and initialize the Qlik module with your configuration:

```ts
import Qlik from "qlik";

const qlik = new Qlik(config);
```

### Authentication

Authenticate to Qlik Sense:

```ts
qlik
  .authenticateToQlik()
  .then(() => console.log("Authenticated to Qlik Sense"))
  .catch((error) => console.error("Authentication failed", error));
```

### Fetch User Information

Fetch authenticated user information:

```ts
qlik
  .setAuthUser()
  .then(() => {
    console.log("User information set", qlik.user);
  })
  .catch((error) => console.error("Failed to fetch user information", error));
```

### Fetch Data

Get List of Spaces:

```ts
qlik
  .getSpaceList()
  .then((spaces) => console.log("Spaces:", spaces))
  .catch((error) => console.error("Failed to fetch spaces", error));
```

Get List of Users:

```ts
qlik
  .getUserList()
  .then((users) => console.log("Users:", users))
  .catch((error) => console.error("Failed to fetch users", error));
```

Get List of Apps:

```ts
qlik
  .getAppList()
  .then((apps) => console.log("Apps:", apps))
  .catch((error) => console.error("Failed to fetch apps", error));
```

Get List of Themes:

```ts
qlik
  .getThemeList()
  .then((themes) => console.log("Themes:", themes))
  .catch((error) => console.error("Failed to fetch themes", error));
```

## Advanced Usage

### Open an App and Fetch Data

```ts
async function fetchAppData(appId: string) {
  try {
    const app = await qlik.isAppOpen(appId);
    const sheets = await qlik.getSheet(app);
    const measures = await qlik.getMeasure(app);
    const fields = await qlik.getFields(app);
    const variables = await qlik.getVariable(app);
    const bookmarks = await qlik.getBookmark(app);

    console.log("Sheets:", sheets);
    console.log("Measures:", measures);
    console.log("Fields:", fields);
    console.log("Variables:", variables);
    console.log("Bookmarks:", bookmarks);
  } catch (error) {
    console.error("Failed to fetch app data", error);
  }
}

fetchAppData("your-app-id");
```

## API Documentation

### Qlik Class

Constructor

```ts
new Qlik(config: IConfig)
```

- `config`: Configuration object.

### Methods

#### Authenticate to Qlik Sense.

`authenticateToQlik(): Promise<void>`

#### Set authenticated user information.

`setAuthUser(): Promise<void>`

#### Fetch data from Qlik Sense API.

`fetchAPI(url: string, method: string = 'GET', payload: any = null): Promise<any>`

- `url`: API endpoint.

- `method`: HTTP method (default: 'GET').

- `payload`: Request payload.

#### Fetch a specific space by ID.

`getSpace(id: string): Promise<any>`

`id`: Space ID.

#### Fetch the list of spaces.

`getSpaceList(): Promise<any[]>`

#### Fetch the list of users.

`getUserList(): Promise<any[]>`

#### Fetch the list of apps.

`getAppList(): Promise<any[]>`

#### Fetch the list of themes.

`getThemeList(): Promise<any[]>`

#### Fetch the list of documents.

`getDocs(): Promise<IApp[]>`

#### Fetch a list of objects from an app.

`getList(app: IApp, type: ListTypes): Promise<any>`

- `app`: Qlik app instance.
- `type`: Type of objects to fetch.

#### Fetch measures from an app.

`getMeasure(app: IApp): Promise<any>`

#### Fetch variables from an app.

- `app`: Qlik app instance.
- `getVariable(app: IApp): Promise<any>`

#### Fetch fields from an app.

- app: Qlik app instance.
- getFields(app: IApp): Promise<any>

#### Fetch bookmarks from an app.

- `app`: Qlik app instance.
- `getBookmark(app: IApp): Promise<any>`

#### Evaluate an expression in an app.

- `app`: Qlik app instance.
- `evaluateExpression(app: IApp, title: any): Promise<any>`

#### Fetch properties of an object in an app.

- `app`: Qlik app instance.
- `title`: Expression to evaluate.
- `objectProper(app: IApp, model: any): Promise<any>`

#### Fetch titles of an object in an app.

- `app`: Qlik app instance.
- `model`: Object model.
- `getQlikObjectTitles(app: IApp, id: string): Promise<any>`

#### Fetch sheets from an app.

- `app`: Qlik app instance.
- `id`: Object ID.
- `getSheet(app: IApp): Promise<any>`

#### Fetch a specific object from an app.

- `app`: Qlik app instance.
- `callObject(app: IApp, id: string): Promise<any>`

#### Fetch data from an app.

- `id`: App ID.
- `getApp(id: string): Promise<any[]>`

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
    .setQlik()
    .then(async (q) => {
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
    .setQlik()
    .then(async (q) => {
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
