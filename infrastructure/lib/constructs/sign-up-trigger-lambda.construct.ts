import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { config } from "dotenv";

config();
export class SignUpLambdaTriggerConstruct extends Construct {
  private lambda: lambda.Function;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.lambda = new lambda.Function(this, "zak-signup-lambda-trigger", {
      runtime: Runtime.NODEJS_18_X,
      handler: "sign-up-trigger.handler",
      functionName: "zak-signup-trigger",
      code: lambda.Code.fromAsset("lambda/cognito-triggers/dist"),
      timeout: Duration.minutes(1),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI || "",
      },
    });
  }

  getFunction() {
    return this.lambda;
  }
}
