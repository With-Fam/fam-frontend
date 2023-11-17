'use strict'

/**
 * @typedef {object} fetchImpl
 * @property {globalThis.fetch} fetchImpl.fetch
 * @property {globalThis.Request} fetchImpl.Request
 * @property {globalThis.Response} fetchImpl.Response
 * @property {globalThis.Headers} fetchImpl.Headers
 */

const fetchNode = require('./fetch.node')
const fetchBrowser = require('./fetch.browser')

// Electron has `XMLHttpRequest` and should get the browser implementation
// instead of node.
const fetch = typeof XMLHttpRequest === 'function' ? fetchBrowser : fetchNode

module.exports = fetch
