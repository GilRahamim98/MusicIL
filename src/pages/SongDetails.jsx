import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {  useGetSongDetailsQuery, useGetSongLyricsQuery, useGetSongRelatedQuery } from '../redux/services/spotify';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery();
  const { data: songLyrics, isFetching: isFetchingSongLyrics } = useGetSongLyricsQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs || isFetchingSongLyrics) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
        </h2>
        <div className="mt-5">
          {songLyrics?.lyrics?.lines
            ? songLyrics?.lyrics?.lines.map((line, i) => (
              <p
                key={i}
                className="text-gray-400
                            text-base my-1"
              >{line.words}
              </p>
            ))
            : (
              <p className="text-gray-400
                            text-base my-1"
              >Sorry, no lyrics found!
              </p>
            )}
        </div>
      </div>
      <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
    </div>

  );
};

export default SongDetails;
