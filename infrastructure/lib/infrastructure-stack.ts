import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoConstruct } from "./constructs/cognito.construct";
import { SignUpLambdaTriggerConstruct } from "./constructs/sign-up-trigger-lambda.construct";
import { UserPoolOperation } from "aws-cdk-lib/aws-cognito";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ZakStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognito = new CognitoConstruct(this, "ZakCognito");
    const signUpLambdaTrigger = new SignUpLambdaTriggerConstruct(
      this,
      "ZakSignUpLambdaTrigger"
    ).getFunction();

    cognito.addLambdaTrigger(
      UserPoolOperation.POST_CONFIRMATION,
      signUpLambdaTrigger
    );
  }
}
