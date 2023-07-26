import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify23.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '3fc57b8fd6mshadf6e5409c37d2ap1de427jsn39ed86b2e0ce');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/playlist_tracks/?id=37i9dQZEVXbMDoHDwVN2tF' }),
    getSongsByGenre: builder.query({ query: (genre) => `/search/?q=${genre}&type=multi&offset=0&limit=10&numberOfTopResults=5` }),
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/?ids=${songid}` }),
    getSongRelated: builder.query({ query: () => '/playlist_tracks/?id=37i9dQZEVXbMDoHDwVN2tF' }), //change
    getArtistDetails: builder.query({ query: (artistId) => `/artist_overview/?id=${artistId}` }),
    getSongByCountry: builder.query({ query: (countryName) => `/search/?q=${countryName}&type=playlist&offset=0&limit=10&numberOfTopResults=5` }),
    getSongsFromPlaylist: builder.query({ query: ({playlistId}) => `/playlist_tracks/?id=${playlistId}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5` }),
    getSongLyrics: builder.query({ query: ({ songid }) => `/track_lyrics/?id=${songid}` }),

  }),
});
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByCountryQuery,
  useGetSongsFromPlaylistQuery,
  useGetSongsBySearchQuery,
  useGetSongLyricsQuery
} = spotifyApi;
