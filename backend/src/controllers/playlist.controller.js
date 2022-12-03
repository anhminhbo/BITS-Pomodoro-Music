const { ResponseService, PlaylistService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getPlaylist = catchAsync(async (req, res) => {
  const { username } = req.session;
  const playlist = await PlaylistService.getPlaylist(username);
  if (playlist.length === 0) {
    throw ResponseService.newError(
      Error.EmptyPlaylist.errCode,
      Error.EmptyPlaylist.errMessage
    );
  }

  res.status(200).json(ResponseService.newSucess({ playlist }));
});

const updatePlaylist = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { song } = req.body;
  if (!song) {
    throw ResponseService.newError(
      Error.EmptySongId.errCode,
      Error.EmptySongId.errMessage
    );
  }
  await PlaylistService.updatePlaylist(username, song);

  res.status(200).json(ResponseService.newSucess());
});

const deleteSong = catchAsync(async (req, res) => {
  const { username } = req.session;

  const songId = req.params.songId;

  if (!songId) {
    throw ResponseService.newError(
      Error.EmptySongId.errCode,
      Error.EmptySongId.errMessage
    );
  }

  await PlaylistService.deleteSong(username, songId);

  res.status(200).json(ResponseService.newSucess());
});

module.exports = { getPlaylist, updatePlaylist, deleteSong };
