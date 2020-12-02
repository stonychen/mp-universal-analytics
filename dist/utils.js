"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureValidCid = exports.isCookieCid = exports.isUuid = void 0;
function isUuid(uuid) {
    if (!uuid)
        return false;
    uuid = uuid.toString().toLowerCase();
    return /[0-9a-f]{8}\-?[0-9a-f]{4}\-?4[0-9a-f]{3}\-?[89ab][0-9a-f]{3}\-?[0-9a-f]{12}/.test(uuid);
}
exports.isUuid = isUuid;
function isCookieCid(cid) {
    return /^[0-9]+\.[0-9]+$/.test(cid);
}
exports.isCookieCid = isCookieCid;
function ensureValidCid(uuid) {
    if (!isUuid(uuid)) {
        if (!isCookieCid(uuid)) {
            return false;
        }
        return uuid;
    }
    uuid = uuid.replace(/\-/g, "");
    return "" +
        uuid.substring(0, 8) + "-" +
        uuid.substring(8, 12) + "-" +
        uuid.substring(12, 16) + "-" +
        uuid.substring(16, 20) + "-" +
        uuid.substring(20);
}
exports.ensureValidCid = ensureValidCid;
