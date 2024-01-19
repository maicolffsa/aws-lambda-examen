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

    const redisKey = 'uniqueKey';
    

    await redis.hset(redisKey, creditCardInfo);

    const tokensResponse = await redis.hgetall(token);

    console.log("dataRd: ", JSON.stringify(tokensResponse))

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

    const redisKey = 'uniqueKey';



    /* const dataget = redis.hgetall(redisKey, (err, result) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log('Hash:', result);
        return result
      }
    }); */

    const dataget = await redis.hgetall(redisKey);


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
    const pathParameters = event.pathParameters;
    
    if (!pathParameters || !pathParameters.token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request. Missing ID parameter.' }),
      };
    }

    const redisKey = 'uniqueKey';

    const { token } = pathParameters;

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