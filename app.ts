import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes';
import artistRoutes from './routes/artist.routes';
import localRoutes from './routes/local.routes';
import favoriteRoutes from './routes/favorite.routes';
import eventoRoutes from './routes/evento.routes';

const app = express();

//settings
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//hello world
app.get('/', (req: any, res: any) => {
    return res.status(200).json({ message: 'Hello World!' });
});

//routes
app.use('/auth', authRoutes);
app.use('/artists', artistRoutes);
app.use('/local', localRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/eventos', eventoRoutes);

export default app;