# qlik

[![NPM](https://img.shields.io/npm/v/qlik.svg)](https://www.npmjs.com/package/qlik)

This module facilitates easy integration between Qlik Sense Enterprise/Cloud and web applications by leveraging the Qlik Capability API. Developers can seamlessly connect to multiple Qlik Sense applications and interact with the Qlik Sense API using the utilities provided in this package. [Qlik helper for more details & other API's](https://help.qlik.com/en-US/sense-developer/August2022/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)

This module provides a set of utilities to streamline the interaction between your web applications and the Qlik Sense API.

## Table of Contents

- Qlik
  - Features
  - Installation
  - Configuration
  - Usage
  - [Advanced Usage](#advanced-usage)
  - [API Documentation](#api-documentation)
  - Example
  - Contributing
  - License

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

Or with yarn:

```bash
$ yarn add qlik
```

## Configuration

Create a configuration object with the following properties:

- **`host` (string)**: The hostname of your Qlik Sense instance.
- **`port` (string | number)**: The port number to connect to Qlik Sense.
- **`prefix` (string)**: The prefix for the Qlik Sense resources (default: /).
- **`isSecure` (boolean)**: Whether to use HTTPS (default: true).
- **`ticket` (string, optional)**: Ticket for authentication.
- **`webIntegrationId` (string, optional)**: Web integration ID for Qlik Sense SaaS.

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

#### Constructor

```ts
new Qlik(config: GetAppConfig)
```

Configuration interface:
```ts
interface GetAppConfig {
  host?: string;                 // The hostname of your Qlik Sense instance
  port: string | number;         // The port number
  prefix?: string;              // The prefix for Qlik Sense resources (default: /)
  isSecure?: boolean;           // Whether to use HTTPS (default: true)
  openWithoutData?: boolean;    // Open app without data
  identity?: string;            // Identity for authentication
  ticket?: string;              // Ticket for authentication
  isSaaS?: boolean;             // Whether connecting to Qlik Sense SaaS
  webIntegrationId?: string;    // Web integration ID for Qlik Sense SaaS
  isCssRequired?: boolean;      // Whether CSS is required
  loginUri?: string;            // Login URI
  auth?: {                      // Authentication configuration
    method: 'redirect' | 'popup';
    popupWidth?: number;
    popupHeight?: number;
    loginCallback?: (user: any) => void;
    logoutCallback?: () => void;
  };
}
```

#### Authentication Methods

```ts
authenticateToQlik(): Promise<void>
setAuthUser(): Promise<void>
```

#### Data Retrieval Methods

```ts
getSpaceList(): Promise<any[]>               // Get list of spaces
getUserList(): Promise<any[]>                // Get list of users
getAppList(): Promise<any[]>                // Get list of apps
getThemeList(): Promise<any[]>              // Get list of themes
getDocs(): Promise<IApp[]>                  // Get list of documents
getApp(id: string): Promise<any[]>          // Get a specific app
isAppOpen(id: string): Promise<IApp>        // Check if an app is open
```

#### App Object Methods

```ts
getList(app: IApp, type: ListTypes): Promise<any>     // Get list of objects from an app
getMeasure(app: IApp): Promise<any>                   // Get measures from an app
getVariable(app: IApp): Promise<any>                  // Get variables from an app
getFields(app: IApp): Promise<any>                    // Get fields from an app
getBookmark(app: IApp): Promise<any>                  // Get bookmarks from an app
getSheet(app: IApp): Promise<any>                     // Get sheets from an app
evaluateExpression(app: IApp, title: any): Promise<any>   // Evaluate expression in an app
objectProper(app: IApp, model: any): Promise<any>     // Get object properties
getQlikObjectTitles(app: IApp, id: string): Promise<any>  // Get object titles
callObject(app: IApp, id: string): Promise<any>       // Call a specific object
```

#### Space Management Methods

```ts
getSpace(id: string): Promise<any>          // Get a specific space
getMoreData(response: any): Promise<any>    // Get additional data from a response
```

### IApp Interface

The IApp interface represents a Qlik Sense application and provides methods for interacting with it:

```ts
interface IApp {
  id: string;
  selectionState: SelectionObject;
  visualization: {
    get?: (id: string, elem?: any | string, options?: any) => Promise<any>;
  };
  
  // State Management
  addAlternateState(qStateName: string): Promise<any>;
  removeAlternateState(qStateName: string): Promise<any>;
  clearAll(lockedAlso?: boolean, state?: string): Promise<any>;
  back(): Promise<any>;
  forward(): Promise<any>;
  
  // App Management
  close(): void;
  doSave(qFileName?: string): Promise<any>;
  doReload(qMode?: "0" | "1" | "2", qPartial?: boolean, qDebug?: boolean): Promise<any>;
  
  // Object Management
  createCube(qHyperCubeDef: HyperCubeDef, callback?: (hypercube: HyperCube) => void): Promise<any>;
  destroySession(id: string): Promise<any>;
  getObject(elem?: HTMLElement | string, id?: string | "CurrentSelections", options?: { 
    noInteraction?: boolean; 
    noSelections?: boolean; 
  }): Promise<any>;
  
  // Properties and Layout
  getAppLayout(callback: (layout: Layout) => void): Promise<any>;
  getFullPropertyTree(id: string): Promise<any>;
  getObjectProperties(id: string): Promise<any>;
  
  // Variables
  variable: {
    getContent(variable: string, callback: (value: Variable, app: IApp) => void): Promise<any>;
    setContent(variable: string, value: string): void;
  };
  
  // Selection Management
  field(field: string, state?: string): QField;
  lockAll(state?: string): Promise<any>;
  unlockAll(state?: string): Promise<any>;
}
```

### ListTypes

Available list types for `getList()`:
```ts
type ListTypes = 
  | "FieldList" 
  | "MeasureList" 
  | "DimensionList" 
  | "BookmarkList" 
  | "SelectionObject" 
  | "SnapshotList" 
  | "MediaList" 
  | "sheet" 
  | "MasterObject" 
  | "VariableList" 
  | "story";
```

## Example

### Enterprise

To get started with a sample module for React with Qlik Enterprise, clone the example project from GitHub and start the project.

### Steps:

1. Clone the repository:

```bash
$ git clone https://github.com/ranvithm/qlik.git
```

2. Navigate to the example project directory:

```bash
$ cd qlik/example/with-enterprise
```

3. Install the dependencies:

```bash
$ npm install
```

4. Start the project:

```bash
$ npm start
```

Before utilizing the Qlik Capability API Wrapper, it's necessary to create a [virtual proxy](https://help.qlik.com/en-US/sense-admin/November2023/Subsystems/DeployAdministerQSE/Content/Sense_DeployAdminister/QSEoW/Administer_QSEoW/Managing_QSEoW/create-virtual-proxy.htm#:~:text=drop%2Ddown%20menu%20to%20display,the%20Virtual%20proxy%20edit%20window.) in your Qlik Sense environment to configure the prefix and whitelist the host (localhost) and port (3000).

Explore the sample project [here](https://github.com/ranvithm/qlik/tree/main/example/with-enterprise).

#### Enterprise Example
```tsx
import { useEffect } from 'react';
import Qlik from 'qlik';

const EnterpriseExample = () => {
  useEffect(() => {
    const config = {
      host: 'your-qlik-server.com',
      prefix: '/your-virtual-proxy/',
      port: 443,
      isSecure: true
    };

    const qlik = new Qlik(config);

    async function initializeQlik() {
      try {
        // Authenticate
        await qlik.authenticateToQlik();
        
        // Get user information
        await qlik.setAuthUser();
        console.log('Current user:', qlik.user);

        // Get list of apps
        const apps = await qlik.getAppList();
        console.log('Available apps:', apps);

        // Open specific app
        const appId = 'your-app-id';
        const app = await qlik.isAppOpen(appId);

        // Get sheets from the app
        const sheets = await qlik.getSheet(app);
        console.log('App sheets:', sheets);

        // Get fields from the app
        const fields = await qlik.getFields(app);
        console.log('App fields:', fields);

      } catch (error) {
        console.error('Error initializing Qlik:', error);
      }
    }

    initializeQlik();
  }, []);

  return <div>Qlik Enterprise Integration Example</div>;
};

export default EnterpriseExample;
```

### Cloud

To get started with a sample module for React with Qlik Cloud, clone the example project from GitHub and start the project.

### Steps:

1. Clone the repository:

```bash
$ git clone https://github.com/ranvithm/qlik.git
```

2. Navigate to the example project directory:

```bash
cd qlik/example/with-cloud
```

3. Install the dependencies:

```bash
$ npm install
```

4. Start the project:

```bash
$ npm start
```

Before utilizing the Qlik Capability API Wrapper, it's necessary to [create a web integration id](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-adminster-web-integrations.htm?_ga=2.178546276.1908556056.1704033907-1088852823.1639579506) in your Qlik Sense environment to configure and whitelist the host (localhost) and port (3000).

Explore the sample project [here](https://github.com/ranvithm/qlik/tree/main/example/with-cloud).

#### Cloud Example
```tsx
import { useEffect } from 'react';
import Qlik from 'qlik';

const CloudExample = () => {
  useEffect(() => {
    const config = {
      host: 'your-tenant.us.qlikcloud.com',
      webIntegrationId: 'your-web-integration-id',
      isSaaS: true
    };

    const qlik = new Qlik(config);

    async function initializeQlikCloud() {
      try {
        // Authenticate to Qlik Cloud
        await qlik.authenticateToQlik();
        
        // Get user information
        await qlik.setAuthUser();
        console.log('Current user:', qlik.user);

        // Get list of spaces
        const spaces = await qlik.getSpaceList();
        console.log('Available spaces:', spaces);

        // Get apps in a specific space
        const spaceId = 'your-space-id';
        const space = await qlik.getSpace(spaceId);
        console.log('Space details:', space);

        // Open and interact with an app
        const appId = 'your-app-id';
        const app = await qlik.isAppOpen(appId);

        // Get various app objects
        const measures = await qlik.getMeasure(app);
        const variables = await qlik.getVariable(app);
        const bookmarks = await qlik.getBookmark(app);

        console.log('App measures:', measures);
        console.log('App variables:', variables);
        console.log('App bookmarks:', bookmarks);

        // Evaluate an expression
        const expression = '=Sum(Sales)';
        const result = await qlik.evaluateExpression(app, expression);
        console.log('Expression result:', result);

      } catch (error) {
        console.error('Error initializing Qlik Cloud:', error);
      }
    }

    initializeQlikCloud();
  }, []);

  return <div>Qlik Cloud Integration Example</div>;
};

export default CloudExample;
```

These examples demonstrate basic usage of the Qlik package with both Enterprise and Cloud environments. They show how to:

- Configure the connection
- Authenticate
- Get user information
- List available apps/spaces
- Open apps
- Interact with app objects
- Evaluate expressions

Remember to replace placeholder values like `'your-qlik-server.com'`, `'your-web-integration-id'`, `'your-app-id'`, etc. with your actual Qlik environment values.

## Contributing

This library is still under construction and we are looking for contributors. If you would like to contribute, please contact me: ranvitranjit@gmail.com

## License

[MIT ©](./LICENSE) [Ranjithkumar M](https://ranvithm.github.io/)
