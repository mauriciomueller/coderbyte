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

  it("Returns the a sha3-512 hash when number is provided", () => {
    const event = 777
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("d50ad22ab38dd06394a4f59f5ba1d73153f97e9afe7128b2bb193132398d3746ce522e539e811c20572c7c5eeb6fffacfe62e0cf6762a758ee4a113f57ed13c7");
  });

  it('returns a hash when partitionKey length is larger than 256', () => {
    const partitionKey = 'a'.repeat(257);
    const event = { partitionKey };

    const result = deterministicPartitionKey(event);

    expect(result).not.toBe(partitionKey);
    expect(result.length).toBe(128);
  });
});