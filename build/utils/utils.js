"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyToDouble = exports.paramToString = void 0;
const paramToString = (param) => (param ? param.toString() : null);
exports.paramToString = paramToString;
const currencyToDouble = (currency) => parseFloat(currency.replace(/[^0-9.-]+/g, ''));
exports.currencyToDouble = currencyToDouble;
//# sourceMappingURL=utils.js.map