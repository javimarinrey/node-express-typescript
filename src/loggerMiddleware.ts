import express from "express";
import jwt from "jsonwebtoken";

function loggerMiddleware(req:any, res: any, next: any) {
    console.log(`${req.method} ${req.path}`);

    if (req.method === "OPTIONS") {
        next()
    } else {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // El token debería estar en formato "Bearer TOKEN"
        console.log('token', token);
        if (!token) {
            return res.status(401).json({message: 'Acceso denegado. No se proporcionó token.'});
        } else {

            try {
                // Verificar el token con la clave secreta
                const secret = process.env.JWT_SECRET || 'defaultSecretKey';
                console.log(secret)
                jwt.verify(token, secret, (err: any, user: any) => {
                    console.log(user)
                    if (err) {
                        return res.status(403).json({ message: 'Token inválido o expirado.' });
                    }
                    console.log('Token valido', user)
                    // Si el token es válido, guarda la información del usuario en req.user
                    req.user = user;
                    next(); // Continuar al siguiente middleware o controlador
                });
            } catch (err) {
                return res.status(500).json({ message: 'Error en la autenticación del token.' });
            }
        }
    }
}

export default loggerMiddleware;