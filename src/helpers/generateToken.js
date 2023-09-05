import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";

export const generateToken = (user) => {
    return jwt.sign(user, TOKEN_KEY, {expiresIn: "1h"})   
}

