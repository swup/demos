# Swup Demos

This is the source repo for the demos on the [doc's demos page](https://swup.js.org/getting-started/demos/)

## Structure

Every demo lives in it's own sub directory and is completely independent. The `<base>` is used
to augment behavior as if on the root of the domain.

## How to run locally

- clone this repo
- `cd` into the cloned folder
- start the server:

```shell
# clone
git clone git@github.com:swup/demos.git swup-demos
# go into the directory
cd swup-demos
# start the server
npm run serve
# build the index file
npm run build
```