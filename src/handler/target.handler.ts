import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { redis } from "../db/redis.db";


export const createTargetData = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { token, card_number, cvv, expiration_month, expiration_year, email } = JSON.parse(event.body || "{}");

    const creditCardInfo = {
      token: token,
      cardNumber: card_number,
      cvv: cvv,
      expirationMonth: expiration_month,
      expirationYear: expiration_year,
      email: email,
    };

    

    await redis.hset(token, creditCardInfo);

    const tokensResponse = await redis.hgetall(token);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item added successfully', token: tokensResponse }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

export const getAllTargetData = async (): Promise<APIGatewayProxyResult> => {
  try {
    const dataget = await redis.keys('*');


    return {
      statusCode: 200,
      body: JSON.stringify({ dataget }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

export const deleteTargetData = async (): Promise<APIGatewayProxyResult> => {
  try {


    const dataflush = redis.flushdb( function (err, succeeded) {
      console.log(succeeded); // will be true if successfull
  });


    return {
      statusCode: 200,
      body: JSON.stringify({dataflush }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};


export const getTargetData = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyData = JSON.parse(event.body || "{}")
    
    if (!bodyData || !bodyData.token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request. Missing ID parameter.' }),
      };
    }


    const { token } = bodyData;

    const tokens = await redis.hgetall(token);

    if (!tokens) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ tokens }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};