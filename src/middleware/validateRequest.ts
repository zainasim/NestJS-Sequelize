import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import Logging from '../library/Logging';

const validateSchema = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params
            });

            return next();
        } catch (error: any) {
            Logging.error(error);
            res.status(422).json({ error });
        }
    };
};
export default validateSchema;
