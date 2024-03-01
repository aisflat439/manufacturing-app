import { StackContext, Bucket as S3Bucket } from "sst/constructs";

export function Bucket({ stack }: StackContext) {
  const bucket = new S3Bucket(stack, "bucket", {
    notifications: {
      objectCreated: {
        function: "packages/functions/src/handle-upload.handler",
        events: ["object_created"],
      },
    },
  });

  return bucket;
}
