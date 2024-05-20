const { validateToken } = require("../config/tokens");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  console.log("toookeeenn", token);
  if (!token) return res.sendStatus(401);

  const user = validateToken(token);
  if (!user) return res.sendStatus(401);
  req.user = user;

  next();
}

module.exports = { validateAuth };

/*
La función validateToken en el archivo auth.js llama a la función validateToken definida en el archivo tokens.js. Aquí está cómo se da el proceso:

En auth.js, la función validateAuth obtiene el token de las cookies de la solicitud entrante utilizando const token = req.cookies.token;.
Luego, llama a la función validateToken(token) para verificar la validez del token JWT. Esta llamada a validateToken(token) pasa el token obtenido en el paso anterior como argumento.
La función validateToken definida en el archivo tokens.js utiliza jwt.verify(token, SECRET) para verificar si el token es válido o no. Aquí, token es el token JWT que se pasa como argumento, y SECRET es la clave secreta utilizada para firmar y verificar el token.
Si el token es válido, jwt.verify devolverá el payload decodificado del token, que indica que la autenticación es exitosa.
Entonces, efectivamente, la función validateToken en auth.js llama a la función validateToken definida en tokens.js para realizar la verificación del token JWT.
*/
