import * as cdk from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { CognitoConstruct } from "./constructs/cognito.construct";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ZakStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    new CognitoConstruct(this, "ZakCognito");
  }
}
