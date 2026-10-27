import { Inputs } from "../src/constants";
import { getS3Config } from "../src/utils/s3Config";
import * as testUtils from "../src/utils/testUtils";

beforeEach(() => {
    testUtils.clearInputs();
});

afterEach(() => {
    testUtils.clearInputs();
});

test("uses explicit credentials when both keys are set", () => {
    const accessKeyId = "access-key";
    const secretAccessKey = "secret-key";
    const region = "us-east-1";

    testUtils.setInput(Inputs.AwsAccessKeyId, accessKeyId);
    testUtils.setInput(Inputs.AwsSecretAccessKey, secretAccessKey);
    testUtils.setInput(Inputs.AwsRegion, region);

    const config = getS3Config();

    expect(config.credentials).toEqual({ accessKeyId, secretAccessKey });
    expect(config.region).toBe(region);
    expect(config.forcePathStyle).toBe(true);
});

test("omits credentials when both keys are empty", () => {
    const region = "us-east-1";

    testUtils.setInput(Inputs.AwsAccessKeyId, "");
    testUtils.setInput(Inputs.AwsSecretAccessKey, "");
    testUtils.setInput(Inputs.AwsRegion, region);

    const config = getS3Config();

    expect(config).not.toHaveProperty("credentials");
    expect(config.region).toBe(region);
    expect(config.forcePathStyle).toBe(true);
});

test("omits credentials when only the access key is set", () => {
    const region = "us-east-1";

    testUtils.setInput(Inputs.AwsAccessKeyId, "access-key");
    testUtils.setInput(Inputs.AwsSecretAccessKey, "");
    testUtils.setInput(Inputs.AwsRegion, region);

    const config = getS3Config();

    expect(config).not.toHaveProperty("credentials");
    expect(config.region).toBe(region);
    expect(config.forcePathStyle).toBe(true);
});
