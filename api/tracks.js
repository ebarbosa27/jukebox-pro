import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById, getPlaylistsByTrack } from "#db/queries/tracks";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});

router.route("/:id/playlists").get(async (req, res) => {
  const playlists = await getPlaylistsByTrack(req.user.id, req.params.id);
  if (playlists.length === 0) return res.status(404).send("Playlists not found.");
  res.send(playlists);
});
