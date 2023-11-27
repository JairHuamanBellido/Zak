import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { IUserPool } from "aws-cdk-lib/aws-cognito";
import { Duration } from "aws-cdk-lib";

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

    const portfolioResource = APIGateway.root.addResource("portfolio-summary");
    const portfolioValuationResource = portfolioResource.addResource(
      "portfolio-valuation"
    );

    const createStockPurchaseIntegration =
      this.createStockPurchasesIntegration();

    const getStockPurchasesByUserIntegration =
      this.getAllStockPurchasesByUserIntegration();

    const getPortfolioSummaryIntegration =
      this.getPortfolioSummaryIntegration();

    stockPurchases.addMethod("POST", createStockPurchaseIntegration, {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });

    stockPurchases.addMethod("GET", getStockPurchasesByUserIntegration, {
      authorizer: auth,
      authorizationType: apigw.AuthorizationType.COGNITO,
    });

    portfolioValuationResource.addMethod(
      "GET",
      getPortfolioSummaryIntegration,
      {
        authorizer: auth,
        authorizationType: apigw.AuthorizationType.COGNITO,
      }
    );
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
          POLYGON_API_KEY: process.env.POLYGON_API_KEY || "",
        },
      }
    );

    return new apigw.LambdaIntegration(createStockPurchasesFn);
  }

  private getAllStockPurchasesByUserIntegration() {
    const getStockPurchasesByUserFn = new lambda.Function(
      this,
      "GetStockPurchasesByUserFn",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "list-stock-purchases.handler",
        functionName: "zak-get-stock-purchases-by-user",
        code: lambda.Code.fromAsset("lambda/api/dist"),
        environment: {
          MONGODB_URI: process.env.MONGODB_URI || "",
        },
      }
    );

    return new apigw.LambdaIntegration(getStockPurchasesByUserFn);
  }

  private getPortfolioSummaryIntegration() {
    const getPortfolioSummaryFn = new lambda.Function(
      this,
      "GetPortfolioSumaryFn",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "get-portfolio-summary.handler",
        functionName: "zak-get-portfolio-summary",
        code: lambda.Code.fromAsset("lambda/api/dist"),
        environment: {
          MONGODB_URI: process.env.MONGODB_URI || "",
        },
      }
    );

    return new apigw.LambdaIntegration(getPortfolioSummaryFn);
  }
}
