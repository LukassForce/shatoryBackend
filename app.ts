import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes';
import artistRoutes from './routes/artist.routes';
// import userRoutes from './routes/user.routes';
// import ticketRoutes from './routes/ticket.routes';
// import ticketRepliesRoutes from './routes/ticketReplies.routes';
// import dpaRutes from './routes/dpa.routes';

const app = express();

//settings
app.set('port', process.env.EXPRESSPORT);

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
    
//hello world
app.get('/', (req:any, res:any) => {
    return res.status(200).json({ message: 'Hello World!'});
});

//routes
app.use('/auth', authRoutes);
app.use('/artists', artistRoutes);

export default app;