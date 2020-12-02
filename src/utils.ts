
function isUuid(uuid: string) {
  if (!uuid) return false
  uuid = uuid.toString().toLowerCase()
  return /[0-9a-f]{8}\-?[0-9a-f]{4}\-?4[0-9a-f]{3}\-?[89ab][0-9a-f]{3}\-?[0-9a-f]{12}/.test(uuid)
}


function isCookieCid(cid: string) {
  return /^[0-9]+\.[0-9]+$/.test(cid)
}


function ensureValidCid(uuid: string) {
  if (!isUuid(uuid)) {
    if (!isCookieCid(uuid)) {
      return false
    }
    return uuid
  }

  uuid = uuid.replace(/\-/g, "")
  return "" +
    uuid.substring(0, 8) + "-" +
    uuid.substring(8, 12) + "-" +
    uuid.substring(12, 16) + "-" +
    uuid.substring(16, 20) + "-" +
    uuid.substring(20)
}

export {
  isUuid,
  isCookieCid,
  ensureValidCid
}
