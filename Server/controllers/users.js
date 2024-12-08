import express from "express";
import * as users from "../model/users.js";

const router = express.Router();

router
  .get("/", (req, res, next) => {
    users
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    users
      .get(req.params.id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    users
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    users
      .update(req.params.id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/delete/:id", (req, res, next) => {
    users
      .remove(req.params.id)
      .then((x) => res.send(x))
      .catch(next);
  });

export const userController = router;
