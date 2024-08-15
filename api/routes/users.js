const express = require("express");
const userRouter = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middlewares/auth");
const axios = require("axios");
const { transporter } = require("../config/mailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

//Registro
userRouter.post("/register", (req, res) => {
  console.log("estoy llegando al BAR  xxxxxxxxxxxxxxxxxxxxx");
  console.log("HOLAAAAAAAAAAAAA", req.body);
  User.create(req.body)
    .then((user) => {
      console.log("userrrrrrrrrrrrrrrr", user);
      res.status(201).send(user);
    })
    .catch((error) =>
      console.log("NO SE HA PODIDO REGISTRAR EL USUARIO", error)
    );
});

//ruta solo para ver los usuarios en la terminal
userRouter.get("/allUsers", (req, res) => {
  User.findAll()
    .then((usuario) => {
      res.send(usuario);
    })
    .catch((error) =>
      console.log("No es han podido enocntrar los usuarios", error)
    );
});

userRouter.get("/me", validateAuth, (req, res) => {
  console.log("usario autenticadooooooo", req.user);
  res.send(req.user);
});

//cuidado con escribir solo /me,siempre acompanado con otra palabra para no tener conflicto /:id
//ruta de un solo usuario./me en este caso debe estar arriba de la ruta /:id
userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  console.log("USERidddddddd", userId);
  console.log("UserID:", userId);
  User.findByPk(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "xxxxxxxxxxxxError al obtener datos de un usuario" });
    });
});

//Ruta Login
userRouter.post("/login", (req, res) => {
  console.log("xxxxxxxxxxxxx", req.body);
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) return res.sendStatus(401);
      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);
        else {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
          };
          const token = generateToken(payload);
          res.cookie("token", token);
          res.send(payload);
        }
      });
    })
    .catch((error) => console.log("Error al loguearse", error));
});

// const API_URL = "https://api.themoviedb.org/3/";
// const API_KEY = "a9dccccd77d6bf4e52b46cbd40148267";

//Ruta todas las peliculas
// userRouter.get("/movies", (req, res) => {
//   axios
//     .get(`${API_URL}/discover/movie`, { params: { api_key: API_KEY } })
//     .then((response) => {
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: "Error al obtener datos de TMDb" });
//     });
// });

//Search para peliculas(funciona)
userRouter.post("/search", (req, res) => {
  console.log("LLego estooo???");
  const search = req.body.search;

  console.log("xxxxxxxx QUERY", search);

  axios
    .get(`${apiURL}/search/movie`, {
      params: { api_key: apiKey, query: search },
    })
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) =>
      console.log(error, "No se pudo hacer search de pelicula")
    );
});

//Search para series
userRouter.post("/series/search", (req, res) => {
  console.log("llego????");
  const search = req.body.search;

  console.log("xxxxxxxx QUERY", search);

  axios
    .get(`${apiURL}/search/tv`, {
      params: { api_key: apiKey, query: search },
    })
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) => console.log("No se ha podido hacer el search", error));
});

//para que entre en la peli despues del search
// userRouter.get("/search/movies/:id", (req, res) => {
//   const { id } = req.params;
//   console.log("consolelock del back!!!!!", id);
//   axios
//     .get(`${API_URL}/movie/${id}`, { params: { api_key: API_KEY } })
//     .then((response) => {
//       res.json(response.data);
//     });
// });

//Ruta de validacion para el token

//Buscamos una serie en particular(funciona)
userRouter.get("/series/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`${apiURL}/tv/${id}`, { params: { api_key: apiKey } })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log("No se pudo encontrar la serie", error));
});

//Buscamos una pelicula en particular(funciona)
userRouter.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  console.log("consolelock del back!!!!!", id);
  axios
    .get(`${apiURL}/movie/${id}`, { params: { api_key: apiKey } })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) =>
      console.log("No se ha podido encontrar la pelicula", error)
    );
});

//Ruta para el logout
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res
    .sendStatus(204)
    .catch((error) => console.log("No se puedo hacer el logout", error));
});

// userRouter("/reset/:id", (req, res) => {
//   const { id } = req.params;
//   const { password } = req.body;
// });

//nueva logica para el nuevo password!
userRouter.put("/forgot", (req, res) => {
  const email = req.body.email;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    const payload = {
      id: user.id,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    const token = generateToken(payload);
    user.token = token;

    user.save().then(() => {
      const restorePasswordLink = `http://localhost:3000/resetPassword/:${user.token}`;

      const info = transporter.sendMail({
        from: `Forgot password ${process.env.SMTP_USER}`,
        to: user.email,
        subject: "recuperar la contraseña",
        html: `
              <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, ignora este correo. Para restablecer tu contraseña, haz clic en el siguiente enlace: </p><a href="${restorePasswordLink}">${restorePasswordLink}</a>
             `,
      });
      info.then(() => {
        res.status(200).send(user.email);
      });
    });
  });
});

//RECUPERAR CONTRASEÑA

// const emailbox = (email, id) => {
//   const resetPasswordLink = `http://localhost:3000/resetPassword/:${id}`;
//   transporter
//     .sendMail({
//       from: `Forgot password ${process.env.SMTP_USER}`,
//       to: email,
//       subject: "recuperar la contraseña",
//       html: `
//       <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, ignora este correo. Para restablecer tu contraseña, haz clic en el siguiente enlace:
//        </p>
//        <p><a href="${resetPasswordLink}">Restablecer Contraseña</p>`,
//     })
//     .then(() => console.log("Mensaje enviado"))
//     .catch((err) => console.error(err));
// };

//ENVIO DE MAIL CITA ACEPTADA

// userRouter.post("/forgot", (req, res) => {
//   const email = req.body.email;
//   emailbox(email);
//   res.status(200).json({ message: "Email envaido correctamente" });
// });

//NUEVA CONTRASEÑA
// userRouter.put(`/reset/:${email}`, (req, res) => {
//   const { user } = req.params.email;
//   User.findByPk(user).then((email) => {
//     if (email !== user.email) {
//       res.sendStatus(404);
//     } else {
//     }
//   });
// });

// Ruta para restablecer la contraseña
userRouter.post("/reset/:id", (req, res) => {
  const userIdFromUrl = req.params.id;
  const userIdFromRequest = req.user.id;
  const { password } = req.body;
  try {
    if (userIdFromRequest !== userIdFromUrl) {
      return res.status(403).send("Unauthorized");
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    // const { id } = req.params;
    // const { password } = req.body;
    User.update(
      { password },
      {
        where: { id: userIdFromRequest },
        returning: true,
      }
    ).then(([rows, user]) => {
      res.status(201).send(user);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
