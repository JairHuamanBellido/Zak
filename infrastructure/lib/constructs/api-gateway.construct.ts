import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { IUserPool } from "aws-cdk-lib/aws-cognito";

export class APIGatewayConstruct extends Construct {
  constructor(scope: Construct, id: string, cognitoAuthorizer: IUserPool) {
    super(scope, id);

    const APIGateway = new apigw.RestApi(this, id, {
      restApiName: "zak-api-rest",
      description: "API Gateway for Zak application",
    });

    const auth = new apigw.CognitoUserPoolsAuthorizer(this, "booksAuthorizer", {
      cognitoUserPools: [cognitoAuthorizer],
      authorizerName: "zak-authorizer",
    });

    const getBillsFn = new lambda.Function(this, "GetBillsFn", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "get-bills.handler",
      functionName: "zak-get-bills",
      code: lambda.Code.fromAsset("lambda/api/dist"),
    });

    const getBillsIntegration = new apigw.LambdaIntegration(getBillsFn);
    const billResource = APIGateway.root.addResource("bills");

    billResource.addMethod("GET", getBillsIntegration, {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
  }
}
