import express from "express";
import * as workouts from "../model/workouts.js";
import { getConnection } from "../model/supabase.js";
const conn = getConnection();
const router = express.Router();

router
  .get("/", (req, res, next) => {
    workouts
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/user/:userId", (req, res, next) => {
    workouts
      .getByUserId(req.params.userId)
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/friends/:userId", async (req, res, next) => {
    try {
      // First get user's friends
      const { data: friends, error: friendsError } = await conn
        .from("friends")
        .select("friendid")
        .eq("userid", req.params.userId);

      if (friendsError) throw friendsError;

      if (!friends || friends.length === 0) {
        return res.json({ data: [] });
      }

      const { data: workouts, error: workoutsError } = await conn
        .from("workouts")
        .select(
          `
        *,
        user:userid (
          id,
          firstname,
          lastname,
          username,
          image
        )
      `
        )
        .in(
          "userid",
          friends.map((f) => f.friendid)
        )
        .order("workoutdate", { ascending: false });

      if (workoutsError) throw workoutsError;

      res.json({ data: workouts });
    } catch (error) {
      next(error);
    }
  })

  .post("/", (req, res, next) => {
    workouts
      .create(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    workouts
      .update(req.params.id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    workouts
      .remove(req.params.id)
      .then((x) => res.send(x))
      .catch(next);
  });

export const workoutController = router;
