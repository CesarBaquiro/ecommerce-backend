import jwt from "jsonwebtoken";

// Palabra secreta de la encriptacion
export const JWT_SECRET = "palabra-secreta";

export function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
        // Tiempo que dura el token, en minutos
        expiresIn: "60m",
    });
    return token;
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Invalid token: ${error}`);
    }
}
