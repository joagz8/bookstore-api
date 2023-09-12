import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";

export const authToken = (req, resp, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token == null) {
            return resp.send('Token no encontrado')
        }
        jwt.verify(token, TOKEN_KEY, (error) => {
            if(error) {
                return resp.send('Token no válido')
            }
            next()
        })        
    } catch (error) {
        console.log('Error en la autenticación del Token', error);
    }
    // const token = req.header('Authorization')

}
