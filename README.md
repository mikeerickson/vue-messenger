# vue-messenger

## Description

Vue Messenger is the vue partner to Codedungeon messenger suite

## Installation

Using `npm`

```bash
npm i @codedungeon/vue-messenger
```

Using `yarn`

```bash
yarn @codedungeon/vue-messenger
```

## Usage

-   Vue Messenger requires at least the `title` or `description` prop
-   If `title` and `description` are supplied, `title` will be **bold**
-   If only `title` is supplied, it will be moved to `description` attribute (no title displayed)

Minimal

```vue
<crm-message type="info" description="Message Title" description="Message Description">
```

Success Message with icon

```vue
<crm-message type="success" description="Success" description="Contact Updated Successfully" :icon="true">
```

Warning Message with auto close

```vue
<crm-message type="warning" description="Warning" description="The light is turning red soon" :auto-close="true" auto-close-delay="2000" :icon="true">
```

```vue
...
errors from parent data
errors = ["error message one","error message two"]
...
<crm-message type="error" description="Validation Failed" description="There were 2 errors" :more="errors" :icon="true">
```

## Props

Vue Messenger provides the following `props`

| **Prop**           | **Type**                                     | **Description**                                       |
| ------------------ | -------------------------------------------- | ----------------------------------------------------- |
| `type`             | String (default: `"info"`)                   | Message type                                          |
| _options_          | alert, danger, error, info, success, warning | Available types                                       |
| `title`            | String (default: `""`)                       | Message title                                         |
| `description`      | String (default: `""`)                       | Message description                                   |
| `icon`             | [Boolean] (default: `false`)                 | Message icon                                          |
| `auto-close`       | Boolean (default: `false`)                   | Message auto close                                    |
| `auto-close-delay` | Number (default: `7500`)                     | Number of milliseconds                                |
| `more`             | [String, Array] (default: `""`)              | Additional text to display when `show more` displayed |
| `more-link-text`   | [String] (default: `"show more"`)            | Message displayed when `more` supplied                |
| `debug`            | [Boolean] (default: `false`)                 | Console log debug information                         |

## Events

Vue Messenger provides the following `events`

| **Event**      | **Description**                 |
| -------------- | ------------------------------- |
| `close`        | Event fired when message closed |
| `closeMessage` | alias to `close` event          |

## Methods

Vue Messenger provides the following `methods`
You can procedurally update message from parent component using an the component `updateMessage` method which accepts on `object` of message options

**Note:** All options will override default component options

| **Event**       | **Description**                                                            |
| --------------- | -------------------------------------------------------------------------- |
| `updateMessage` | Updates message (receives messasge `config` which may contain one or more) |
| `config`        | type (_options_): message type                                             |
|                 | title: message title                                                       |
|                 | description: message description                                           |
|                 | autoClose (false): message autoClose                                       |
|                 | autoCloseDelay (7500): message autoCloseDelay                              |
|                 | more ([]): array of `more` messages                                        |
|                 | moreLinkText ('show more'): message displayed when more items supplied     |
|                 | icon (false): message icon                                                 |
|                 | debug (false): use message debug mode                                      |

```js
let msgOptions = { type: "success", title: "Success", description: "Contact Updated Successfully" }
this.$refs["crm-message"].updateMessage(msgOptions)
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for details.

## Security

If you discover any security related issues, please email [support@codedungeon.io](mailto:support@codedungeon.io) instead of using the issue tracker.

## Credits

vue-messenger written by Mike Erickson

E-Mail: [mike.erickson@codedungeon.io](mailto:mike.erickson@codedungeon.io)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](https://codedungeon.io)

## License

Copyright &copy; 2020 Mike Erickson
Released under the MIT [License](LICENSE)
