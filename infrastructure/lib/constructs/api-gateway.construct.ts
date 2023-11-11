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

    const auth = new apigw.CognitoUserPoolsAuthorizer(
      this,
      "zakGeneralAuthorizer",
      {
        cognitoUserPools: [cognitoAuthorizer],
        authorizerName: "zak-authorizer",
      }
    );

    const stockPurchases = APIGateway.root.addResource("stock-purchases");

    const createStockPurchaseIntegration =
      this.createStockPurchasesIntegration();

    stockPurchases.addMethod("POST", createStockPurchaseIntegration, {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });
  }

  private createStockPurchasesIntegration() {
    const createStockPurchasesFn = new lambda.Function(
      this,
      "CreateStockPurchasesFn",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "create-stock-purchases.handler",
        functionName: "zak-create-stock-purchases",
        code: lambda.Code.fromAsset("lambda/api/dist"),
        environment: {
          MONGODB_URI: process.env.MONGODB_URI || "",
        },
      }
    );

    return new apigw.LambdaIntegration(createStockPurchasesFn);
  }
}
