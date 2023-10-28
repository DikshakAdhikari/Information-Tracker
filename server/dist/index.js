"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const allowedOrigins = ['https://task-tracker-dikshak.vercel.app'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(express_1.default.json());
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const todos_1 = __importDefault(require("./routes/todos"));
app.use('/user', user_1.default);
app.use('/todos', todos_1.default);
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳');
});
if (typeof process.env.MONGO_URI === "string") {
    mongoose_1.default.connect(process.env.MONGO_URI).then(() => console.log('DB connected successfully')).catch((err) => console.log(err));
}
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
