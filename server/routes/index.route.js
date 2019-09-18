export const router = require("express").Router();
import { router as authRouter } from "./auth.route";

router.get("/health", (req, res) => {
  res.send("OK");
});

router.use("/auth", authRouter);
