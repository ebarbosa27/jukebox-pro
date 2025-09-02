import db from "#db/client";

export async function createTrack(name, durationMs) {
  const sql = `
  INSERT INTO tracks
    (name, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(sql, [name, durationMs]);
  return track;
}

export async function getTracks() {
  const sql = `
  SELECT *
  FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function getTracksByPlaylistId(id) {
  const sql = `
  SELECT tracks.*
  FROM
    tracks
    JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists.id = playlists_tracks.playlist_id
  WHERE playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}

export async function getTrackById(id) {
  const sql = `
  SELECT *
  FROM tracks
  WHERE id = $1
  `;
  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}

export async function getPlaylistsByTrack(userId, trackId) {
  // get all playlist that is owned by the user and that contains this track
  const sql = `
  SELECT
    playlists.*
  FROM
    playlists
    JOIN playlists_tracks ON playlists_tracks.playlist_id = playlists.id
    JOIN tracks ON tracks.id = playlists_tracks.track_id
  WHERE
    playlists.user_id = $1 AND tracks.id = $2 
  `;
  const { rows: playlists } = await db.query(sql, [userId, trackId]);
  return playlists;
}
