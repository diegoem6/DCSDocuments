const ad = require('../config/activeDirectory');

const authenticateAD = (req, res, next) => {
    const { email, password } = req.body;
    console.log("Datos recibidos authAD:", req.body);
    if (!email || !password) {
        return res.status(400).json({
            ok: false,
            msg: 'Por favor ingrese usuario y contraseña'
        });
    }

    ad.authenticate(email, password, (err, auth) => {
        if (err) {
            console.error('Error de autenticación AD:', err);
            return res.status(401).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }

        if (auth) {
            // Obtener información del usuario
            ad.findUser(email, (err, user) => {
                if (err) {
                    console.error('Error al buscar usuario:', err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al obtener información del usuario'
                    });
                }

                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Usuario no encontrado en el Active Directory'
                    });
                }
            });
        }
    });
};

module.exports = {
    authenticateAD
}; 