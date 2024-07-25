# Color Scheme Provider

A library for managing and tracking preferred color schemes in web applications, with automatic detection, customization options, and subscription-based notifications.

## Documentation

See the [wiki](https://github.com/sagemodeninja/color-scheme-provider/wiki) for guides on how to use the components.\
Or, see the [demo site](https://dev.garyantier.com/color-scheme-provider) for examples and demos.

<!-- TODO: Add wiki/documentation. -->

## v2.* Breaking Changes

### ColorSchemeProvider Members
+ Deprecated `preferredColorScheme` and `colorScheme` properties.
    - Subscribers are notified and given a `scheme` parameter with a value equivalent to the `colorScheme` property.
    - Use asynchronous `update` function to update schemes, this is equivalent to setting a value to `preferredColorScheme`.
+ Renamed `subscribeNotification` to `subscribe`.
+ Callback for `subscribe` now has a `scheme` parameter.

### Behavior
+ Subscribing will now trigger an initial callback with the latest scheme value as a parameter.
+ The `subscribe`, `toggle` and the new `update` functions is now asynchronous.

## Installation

From within your project, run:

`npm i @sagemodeninja/color-scheme-provider`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

### Set up

Initialize repo:

```cli
git clone https://github.com/sagemodeninja/color-scheme-provider.git
cd color-scheme-provider
```

Install the necessary dependencies:

```
npm install
```

Run a local demo:

```
npm start
```
