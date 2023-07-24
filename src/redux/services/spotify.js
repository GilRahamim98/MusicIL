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
    getSongRelated: builder.query({ query: () => '/playlist/?id=37i9dQZEVXbMDoHDwVN2tF' }), //change
    getArtistDetails: builder.query({ query: (artistId) => `/artist_overview/?id=${artistId}` }),
    getSongByContry: builder.query({ query: () => '/playlist/?id=37i9dQZEVXbMDoHDwVN2tF' }), //change
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5` }),
  }),
});
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongByContryQuery,
  useGetSongsBySearchQuery,
} = spotifyApi;