# Swup Demos

This is the source repo for the demos on the [doc's demos page](https://swup.js.org/getting-started/demos/)

## Structure

Every demo lives in it's own sub directory and is completely independent. The [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/base) tag is used for encapsulation.

## How to run locally

```shell
# clone
git clone git@github.com:swup/demos.git swup-demos
# go into the directory
cd swup-demos
# start the server
npm run serve
# build the index.html file (only relevant for deployment)
npm run build
```