import jwt from 'jsonwebtoken';

const user = { id: 1, username: 'usuario' };
const secret = process.env.JWT_SECRET || 'defaultSecretKey';
console.log(secret)
const token = jwt.sign(user, secret, { expiresIn: '1h' });
console.log(token); // El token JWT generado
