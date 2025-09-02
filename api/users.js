import { createUser, getUser } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken, verifyToken } from "#utils/jwt";
import express from "express";
const router = express.Router();
export default router;

router.route("/register").post(requireBody(["username", "password"]), async (req, res) => {
  // add user to the db requesting username and password
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await createUser(username, password);
    const token = createToken(user.id);
    res.send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/login").post(requireBody(["username", "password"]), async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await getUser(username, password);
    const token = createToken(user.id);
    res.send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});
