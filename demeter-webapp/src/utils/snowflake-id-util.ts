export class SnowflakeIdUtil {
    private static readonly twepoch = BigInt(1325376000000); // January 1, 1954 00:00:00 UTC
    private static readonly sequenceBits = BigInt(12); // Sequence bits
    private static readonly workerIdBits = BigInt(5); // Worker ID bits
    private static readonly datacenterIdBits = BigInt(5); // Datacenter ID bits
    private static readonly sequenceMask = BigInt(-1) ^ (BigInt(-1) << SnowflakeIdUtil.sequenceBits); // Sequence mask
    private static readonly workerIdShift = SnowflakeIdUtil.sequenceBits; // Worker ID shift
    private static readonly datacenterIdShift = SnowflakeIdUtil.sequenceBits + SnowflakeIdUtil.workerIdBits; // Datacenter ID shift
    private static readonly timestampLeftShift = SnowflakeIdUtil.sequenceBits + SnowflakeIdUtil.workerIdBits + SnowflakeIdUtil.datacenterIdBits; // Timestamp left shift

    private static sequence = BigInt(0); // Sequence number
    private static lastTimestamp = BigInt(-1); // Last timestamp
    private static workerId: bigint = BigInt(1); // Worker ID
    private static datacenterId: bigint = BigInt(1); // Datacenter ID

    private static tilNextMillis(lastTimestamp: bigint): bigint {
        let timestamp = BigInt(Date.now());
        while (timestamp <= lastTimestamp) {
            timestamp = BigInt(Date.now());
        }
        return timestamp;
    }

    public static nextId(): bigint {
        let timestamp = BigInt(Date.now());
        if (timestamp < SnowflakeIdUtil.lastTimestamp) {
            throw new Error(`Clock is moving backwards. Rejecting requests until ${SnowflakeIdUtil.lastTimestamp}`);
        }
        if (SnowflakeIdUtil.lastTimestamp === timestamp) {
            SnowflakeIdUtil.sequence = (SnowflakeIdUtil.sequence + BigInt(1)) & SnowflakeIdUtil.sequenceMask;
            if (SnowflakeIdUtil.sequence === BigInt(0)) {
                timestamp = SnowflakeIdUtil.tilNextMillis(SnowflakeIdUtil.lastTimestamp);
            }
        } else {
            SnowflakeIdUtil.sequence = BigInt(0);
        }
        SnowflakeIdUtil.lastTimestamp = timestamp;
        return ((timestamp - SnowflakeIdUtil.twepoch) << SnowflakeIdUtil.timestampLeftShift) |
            (SnowflakeIdUtil.datacenterId << SnowflakeIdUtil.datacenterIdShift) |
            (SnowflakeIdUtil.workerId << SnowflakeIdUtil.workerIdShift) |
            SnowflakeIdUtil.sequence;
    }
}