![](./_assets/chartIQ-horizontal.png)

# Sample React Native Chart

## What This Is

This is a basic ChartIQ chart with connection to a React Native component. The plumbing is simplistic as a proof-of-concept to help you on your way and is not representative of production-level code.

Of note:

1. This has been worked against iOS, not Android.
1. However, the usage of the Mobile SDK is the same.
1. Please note that I personally am not an expert with React Native, so this codebase makes no prescriptions on code vis-à-vis React Native.

![](./_assets/gif.gif)
![](./_assets/landscape.png)

The top-left "AAPL" and ticking price are passed to the React component via postMessage when retriving information from the mobile bridge. Again, this is just a simple example. 

## Setup

1. `npm install`
1. `npm run chartiq`

`npm run chartiq` is a convenience that I wrote to both start the Express webserver to serve up the webview, as well as begin the iOS simulator. Please modify as needed or ignore it completely and run `npm start` in [web](./web) and `npm run ios` in the root. Let me know which one worked best for you. 

## A More True-to-Life Branch

[This branch](https://github.com/ChartIQ/ChartIQ-React-Native-POC/tree/UI) has more to it that may be useful in that it contains some UI elements, again as a proof-of-concept.

![](./_assets/UI.gif)

## Documentation

https://documentation.chartiq.com

https://chartiq.readme.io/docs

## Contact

charting-solutions@chartiq.com
