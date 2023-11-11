import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Created successfully!" }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "something went wrong" }),
    };
  }
};
