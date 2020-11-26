"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WineController {
    constructor() {
        this.index = (req, res, next) => {
            try {
                res.status(200).send("Wine API Working");
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = WineController;
//# sourceMappingURL=wine.controller.js.map