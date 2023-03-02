const crypto = require("crypto")

const TRIVIAL_PARTITION_KEY = "0"
const MAX_PARTITION_KEY_LENGTH = 256

const generateHashValue = (value) => {
  return crypto.createHash("sha3-512").update(value).digest("hex")
}

const generatePartitionKey = (value) => {
  return generateHashValue(JSON.stringify(value))
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY
  }

  const partitionKey = event.partitionKey || generatePartitionKey(event)

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? generateHashValue(partitionKey) : partitionKey
}