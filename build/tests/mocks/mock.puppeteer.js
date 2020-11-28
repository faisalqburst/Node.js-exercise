"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubPuppeteer = exports.stubBrowser = exports.stubPage = void 0;
const wines_1 = require("../data/wines/wines");
exports.stubPage = {
    setRequestInterception() {
        return Promise.resolve();
    },
    on() {
        console.log('on function');
    },
    waitForSelector() {
        return Promise.resolve();
    },
    setUserAgent() {
        return Promise.resolve();
    },
    evaluate() {
        return Promise.resolve(wines_1.WINES);
    },
    goto(url) {
        console.log(url);
        return Promise.resolve();
    },
};
exports.stubBrowser = {
    newPage() {
        return Promise.resolve(exports.stubPage);
    },
    close() {
        return Promise.resolve();
    },
};
exports.stubPuppeteer = {
    launch() {
        return Promise.resolve(exports.stubBrowser);
    },
};
//# sourceMappingURL=mock.puppeteer.js.map