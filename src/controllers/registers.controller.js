import { connection } from "../db.js";
import bcrypt from "bcrypt"
import { generateToken } from "../helpers/generateToken.js";

export const signIn = async (req, resp) => {
    try {
        const {username, password} = req.body
        const dbRegister = await connection.query('SELECT username, password FROM Register WHERE username = ?', [username])
        let validUser = dbRegister[0][0].username
        let validPassword = dbRegister[0][0].password
        console.log(validUser);
        console.log(validPassword);
        if (validUser == null) {
            resp.send('Usuario incorrecto')
        }
        else if (validPassword == null) {
            resp.send('Contraseña incorrecta')
        }
        else if (validUser == null && validPassword == null ) {
            resp.send('Nombre de usuario y contraseña incorrectos')
        }
        else {
            const validEncryptPassword = await bcrypt.compare(JSON.stringify(password), validPassword)
            
            if (validEncryptPassword) {
                const token = generateToken({username})
                console.log(token);
            }
        }
    } catch (error) {
        console.log('Error', error);
    }
}

export const signUp = async (req, resp) => {
    try {
        const {username, password} = req.body
        const encryptPassword = await bcrypt.hash(JSON.stringify(password), 10)
        if (username == null || password == null) {
            resp.send('Debe completar correctamente todos los campos')
        } else {
            await connection.query('INSERT INTO Register (username, password) VALUES (?, ?)', [username, encryptPassword])
            const token = generateToken({username})
            console.log(token);
        }
    } catch (error) {
        console.log('Error', error);
    }
}