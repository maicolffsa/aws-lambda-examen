import { Request, Response } from 'express';
import { getTargetData, createTargetData, getAllTargetData, deleteTargetData } from '../handler/target.handler';
import { generateToken } from '../middleware/jwt.middleware';

export const getTarget = async (req: Request, res: Response): Promise<void> => {

  const authHeader: string | undefined = req.header("Authorization");

    
  
    if (!authHeader) {
      res.status(401).json({ error: 'Authorization header is missing' });
    }
    else{

        const [bearer, token] = authHeader.split(' ');

  const result = await getTargetData({ body: JSON.stringify({"token":token}) } as any);
  res
    .header("Access-Control-Allow-Origin", "*")
    .status(result.statusCode)
    .json(JSON.parse(result.body));
    }


};

export const getAllTarget = async (req: Request, res: Response): Promise<void> => {

  const result = await getAllTargetData();
  res
    .header("Access-Control-Allow-Origin", "*")
    .status(result.statusCode)
    .json(JSON.parse(result.body));


};

export const deleteTarget = async (req: Request, res: Response): Promise<void> => {

  const result = await deleteTargetData();
  res
    .header("Access-Control-Allow-Origin", "*")
    .status(result.statusCode)
    .json(JSON.parse(result.body));


};


export const createTarget = async (req: Request, res: Response): Promise<void> => {

  const {card_number, cvv, expiration_month, expiration_year, email } = req.body || "{}";

  const newToken = generateToken()

  //const result = await createTargetData({ body: newToken + JSON.stringify(req.body) } as any);


  const result = await createTargetData({ body: JSON.stringify({
                                                    "token": newToken, 
                                                    "card_number": card_number, 
                                                    "cvv": cvv, 
                                                    "expiration_month": expiration_month, 
                                                    "expiration_year": expiration_year, 
                                                    "email": email}) } as any);
  res
    .header("Access-Control-Allow-Origin", "*")
    .status(result.statusCode)
    .json(JSON.parse(result.body));


};