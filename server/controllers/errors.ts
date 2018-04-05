import { Request, Response, NextFunction } from 'express';

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 Not Found');
}

export const handle500 = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('500 Internal Server Error');
}



