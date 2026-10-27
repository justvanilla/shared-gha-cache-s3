import * as core from "@actions/core";
import { S3ClientConfig } from "@aws-sdk/client-s3";
import { getConfig } from "github-actions.cache-s3/lib/internal/config";

import { Inputs } from "../constants";

export function getS3Config(): S3ClientConfig {
    const accessKeyId = core.getInput(Inputs.AwsAccessKeyId);
    const secretAccessKey = core.getInput(Inputs.AwsSecretAccessKey);
    const config = getConfig(
        core.getInput(Inputs.AwsRegion),
        accessKeyId,
        secretAccessKey
    );
    if (!accessKeyId || !secretAccessKey) {
        delete config.credentials;
    }
    return config;
}
