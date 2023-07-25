import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongByCountryQuery, useGetSongsFromPlaylistQuery } from '../redux/services/spotify';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongByCountryQuery(country);
  const { data: songsData, isFetching: isFetchingSongsData } = useGetSongsFromPlaylistQuery(playlistId);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });


  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_w1PlSHEnlrfedbHXksB7GxG85bScW')
      .then((res) => setCountry(`top 50 ${regionNames.of(res?.data?.location?.country)}`))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  useEffect(() => {
    setPlaylistId(data?.playlists?.items[0]?.data?.uri?.slice(17));
  }, [data]);

  if (isFetching && loading && isFetchingSongsData) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col ">
      <h2 className="font-bold text-3xl text-white
            text-left mt-4 mb-10"
      >
        Around You
      </h2>
      <div className="flex flex-wrap sm:justify-start
            justify-center gap-8"
      >
        {playlistId&& songsData?.tracks?.items?.filter((song) => song?.data).map((song, i) => (
          <SongCard
            key={song?.data?.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}

      </div>
    </div>
  );
};

export default AroundYou;
