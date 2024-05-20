const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const favsRouter = require("./favs");
const serieRouter = require("./serie");

router.use("/users", userRouter);
router.use("/favs", favsRouter);
router.use("/serie", serieRouter);

module.exports = router;


// userRouter.post("/register", async (req, res) => {
//   try {
//     console.log("estoy llegando al BAR  xxxxxxxxxxxxxxxxxxxxx");
//     console.log("HOLAAAAAAAAAAAAA", req.body);
//     const user = await User.create(req.body);
//     console.log("userrrrrrrrrrrrrrrr", user);
//     res.status(201).send(user);
//   } catch (error) {
//     console.log("NO SE HA PODIDO REGISTRAR EL USUARIO", error);
//     res.status(500).send({ error: "No se pudo registrar el usuario" });
//   }
// });
