const { ResponseService, PlaylistService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getPlaylist = catchAsync(async (req, res) => {
  const { username } = req.session;
  const playlist = await PlaylistService.getPlaylist(username);
  // if (playlist.length === 0) {
  //   res.body = {
  //     errCode: Error.EmptyPlaylist.errCode,
  //     errMessage: Error.EmptyPlaylist.errMessage,
  //   };
  //   throw ResponseService.newError(
  //     Error.EmptyPlaylist.errCode,
  //     Error.EmptyPlaylist.errMessage
  //   );
  // }

  res.body = ResponseService.newSucess({ playlist });
  res.status(200).json(res.body);
});

const updatePlaylist = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { song } = req.body;
  if (!song) {
    res.body = {
      errCode: Error.EmptySong.errCode,
      errMessage: Error.EmptySong.errMessage,
    };
    throw ResponseService.newError(
      Error.EmptySong.errCode,
      Error.EmptySong.errMessage
    );
  }
  await PlaylistService.updatePlaylist(username, song);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

const deleteSong = catchAsync(async (req, res) => {
  const { username } = req.session;

  const songId = req.params.songId;

  if (!songId) {
    res.body = {
      errCode: Error.EmptySongId.errCode,
      errMessage: Error.EmptySongId.errMessage,
    };
    throw ResponseService.newError(
      Error.EmptySongId.errCode,
      Error.EmptySongId.errMessage
    );
  }

  await PlaylistService.deleteSong(username, songId);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

module.exports = { getPlaylist, updatePlaylist, deleteSong };
