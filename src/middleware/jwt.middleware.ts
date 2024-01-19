import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

  // Middleware to verify JWT token
 export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader: string | undefined = req.header("Authorization");

    
  
    if (!authHeader) {
      res.status(401).json({ error: 'Authorization header is missing' });
    }
    else{

        const [bearer, token] = authHeader.split(' ');

        jwt.verify(token, process.env.JWT_SECRET_KEY || 'yourSecretKey' as string, (err, decoded) => {
            if (err) {
                console.log("error: ", err)
              return res.status(401).json({ error: err });
            }
          
        
            // If verification is successful, you can attach the decoded token to the request object
      
            console.log("token: ", decoded)
           // req.token = decoded;
        
            // Call the next middleware or route handler
            next();
          })

    }
  };

  interface TokenPayload {
    tokenId: string;
    // Add other properties as needed
  }

  const payload: TokenPayload = {
    tokenId: '123',
    // Add other properties as needed
  };
  

  export function generateToken(): string {
    // The secret key used to sign the token (replace 'yourSecretKey' with your actual secret)
    const secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
  
    // Token expiration time (adjust as needed)
    const expires = 15;
  
    // Create and sign the JWT token
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });
  
    return token;
  }
