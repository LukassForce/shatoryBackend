"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const artist_routes_1 = __importDefault(require("./routes/artist.routes"));
const local_routes_1 = __importDefault(require("./routes/local.routes"));
// import userRoutes from './routes/user.routes';
// import ticketRoutes from './routes/ticket.routes';
// import ticketRepliesRoutes from './routes/ticketReplies.routes';
// import dpaRutes from './routes/dpa.routes';
const app = (0, express_1.default)();
//settings
app.set('port', process.env.PORT || 3001);
//middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//hello world
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
});
//routes
app.use('/auth', auth_routes_1.default);
app.use('/artists', artist_routes_1.default);
app.use('/local', local_routes_1.default);
exports.default = app;
