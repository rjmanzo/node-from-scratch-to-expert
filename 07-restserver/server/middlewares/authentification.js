const jwt = require('jsonwebtoken');

let tokenauthentication = (req, res, next) => {

    let tokenauth = req.get('Authorization');

    jwt.verify(tokenauth, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    })
};

let adminRoleAuthorization = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(403).json({
            ok: false,
            message: 'Usuario no autorizado'
        })
    }
};


module.exports = {
    tokenauthentication,
    adminRoleAuthorization
}