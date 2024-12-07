import express from "express";
import * as friends from "../model/friends.js";
import { getConnection } from "../model/supabase.js";
const router = express.Router();
const conn = getConnection();

router
  .get("/", (req, res, next) => {
    friends
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })
  .get("/user/:userId", (req, res, next) => {
    friends
      .getUserFriends(req.params.userId)
      .then((x) => res.send(x))
      .catch(next);
  })
  // Simplified status check
  .get("/status/:userId/:friendId", async (req, res, next) => {
    try {
      const { data, error } = await conn
        .from("friends")
        .select("*")
        .eq("userid", req.params.userId)
        .eq("friendid", req.params.friendId)
        .single();

      if (error) {
        console.error("Status check error:", error);
        return res.json({ data: false });
      }

      res.json({ data: !!data });
    } catch (error) {
      console.error("Server error:", error);
      res.json({ data: false });
    }
  })
  // Simplified friend creation
  .post("/", async (req, res, next) => {
    try {
      const friendData = {
        userid: req.body.userid,
        friendid: req.body.friendid,
      };
      const result = await friends.add(friendData);
      res.send(result);
    } catch (error) {
      next(error);
    }
  })
  // Simplified friend removal
  .delete("/:userId/:friendId", (req, res, next) => {
    friends
      .remove(req.params.userId, req.params.friendId)
      .then((x) => res.send(x))
      .catch(next);
  });

export const friendController = router;
