declare function isUuid(uuid: string): boolean;
declare function isCookieCid(cid: string): boolean;
declare function ensureValidCid(uuid: string): string | false;
export { isUuid, isCookieCid, ensureValidCid };
