const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the existing partition key when provided", () => {
    const event = {
      partitionKey : 'partitionKeyExistingValue'
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("partitionKeyExistingValue");
  });

  it("Returns the a sha3-512 hash when string is provided", () => {
    const event = 'randomPartitionKey'
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("a7e8d6e0522a18fe753b724c983d37e31b6c1e226b18e673813301f800834aa1764f435bf6197523bf391927fee0806eebb646aa1a21553b52b69d3e77eb80aa");
  });

  test('returns a hash when partitionKey length is larger than 256', () => {
    const partitionKey = 'a'.repeat(257);
    const event = { partitionKey };

    const result = deterministicPartitionKey(event);

    expect(result).not.toBe(partitionKey);
    expect(result.length).toBe(128);
  });

});