import { RemovalPolicy, StackProps } from "aws-cdk-lib";
import {
  AccountRecovery,
  UserPool,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CognitoConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);

    const name = "zak-cognito";

    const userPool = new UserPool(this, name, {
      userPoolName: name,
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      standardAttributes: {
        gender: { required: false },
        givenName: { required: true },
        email: { required: true },
        familyName: { required: true },
      },

      removalPolicy: RemovalPolicy.DESTROY,

      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage:
          "Thanks for signing up to our awesome app! Your verification code is {####}",
      },

      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
        requireLowercase: true,
        requireSymbols: true,
        requireUppercase: true,
      },
    });

    userPool.addClient("zak-app-client", {
      userPoolClientName: "zak-app-client",
      oAuth: {
        flows: { authorizationCodeGrant: false, implicitCodeGrant: true },
      },
    });

    userPool.addDomain("zak-domain-cognito", {
      cognitoDomain: {
        domainPrefix: "zak",
      },
    });
  }
}
