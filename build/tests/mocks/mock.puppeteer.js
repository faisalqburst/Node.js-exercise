"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubPuppeteer = exports.stubBrowser = exports.stubPage = void 0;
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
        return Promise.resolve();
    },
    waitForNavigation() {
        return Promise.resolve();
    },
    click() {
        return Promise.resolve();
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