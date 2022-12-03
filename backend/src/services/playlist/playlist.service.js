const { UserModel } = require("../../models");
const UserService = require("../user/user.service");
const RedisService = require("../redis/redis.service");

const getPlaylist = async (username) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { playlist } = user;

  //  Handle to cached user playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, { ...cachedData, playlist });

  return playlist;
};

const updatePlaylist = async (username, song) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { playlist } = user;

  const newPlaylist = playlist.length === 0 ? [song] : [...playlist, song];

  const filter = { username };
  const update = { playlist: newPlaylist };

  // Get new playlist after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    playlist: newPlaylist,
  });

  return;
};

const deleteSong = async (username, songId) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { playlist } = user;

  // Filter playlist to exclude the deletedSong
  const newPlaylist = playlist.filter((song) => song.songId !== songId);

  const filter = { username };
  const update = { playlist: newPlaylist };

  // Get new playlist after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    playlist: newPlaylist,
  });

  return;
};

module.exports = { getPlaylist, updatePlaylist, deleteSong };
