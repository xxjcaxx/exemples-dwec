import { describe, expect, test } from "vitest";

import { sortArray } from "../utils/utilsArrays";
import { getMovie } from "../services/supaservice";

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
const sabrina = [
    {
      adult: false,
      belongs_to_collection: "not available",
      budget: "58000000",
      original_language: "en",
      original_title: "Sabrina",
      overview:
        "An ugly duckling having undergone a remarkable change, still harbors feelings for her crush: a carefree playboy, but not before his business-focused brother has something to say about it.",
      popularity: 6.677277,
      release_date: "1995-12-15",
      revenue: "0.0",
      runtime: "127.0",
      tagline:
        "You are cordially invited to the most surprising merger of the year.",
      title: "Sabrina",
      vote_average: "6.2",
      vote_count: "141.0",
      languages: "['Français', 'English']",
      day_of_week: "Friday",
      month: "Dec",
      season: "Q4",
      year: "1995",
      has_homepage: "NO",
      genre: "['Comedy', 'Romance']",
      companies:
        "['Paramount Pictures', 'Scott Rudin Productions', 'Mirage Enterprises', 'Sandollar Productions', 'Constellation Entertainment', 'Worldwide', 'Mont Blanc Entertainment GmbH']",
      countries: "['Germany', 'United States of America']",
      id: "469b13d8-166f-4532-8efc-af805bf2b553",
    },
  ];
const server = setupServer(
    http.get('https://ygvtpucoxveebizknhat.supabase.co/rest/v1/movies?id=eq.469b13d8-166f-4532-8efc-af805bf2b553&select=*', (req, res, ctx) => {
        return res(ctx.json(sabrina)); // Mock de respuesta exitosa
    }),
);

describe("Test de movies", function () {
  describe("Test de funcions", function () {
    test("SortArray deuria retornar un array", function () {
      expect(sortArray([2, 3, 1, 6, 2])).toBeInstanceOf(Array);
    });
    test("SortArray deuria retornar un array amb la mateixa longitut", function () {
      const arrayOriginal = [2, 3, 1, 6, 2];
      expect(sortArray(arrayOriginal).length).toBe(arrayOriginal.length);
    });
    test("SortArray deuria retornar un array amb els mateixos elements", function () {
      const arrayOriginal = [2, 3, 1, 6, 2];
      expect(
        sortArray(arrayOriginal).every((n) => arrayOriginal.includes(n))
      ).toBe(true);
    });
    test("SortArray deuria retornar un array ordenat", function () {
      const arrayOriginal = [2, 3, 1, 6, 2];
      expect(sortArray(arrayOriginal)).toEqual([1, 2, 2, 3, 6]);
    });
    test("SortArray no deuria mutar l'array original", function () {
      const arrayOriginal = [2, 3, 1, 6, 2];
      expect(sortArray(arrayOriginal)).toEqual([1, 2, 2, 3, 6]);
      expect(arrayOriginal).toEqual([2, 3, 1, 6, 2]);
    });
  });

  const token = `eyJhbGciOiJIUzI1NiIsImtpZCI6IjBiOHdVQS9nMHU4VkJ2eUIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3lndnRwdWNveHZlZWJpemtuaGF0LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI4NjYyMDI1YS0yNWJlLTQ3NzctYWU1NC02NmNiNmU1ODkyOWUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI5Nzk1OTM0LCJpYXQiOjE3Mjk3OTIzMzQsImVtYWlsIjoiam9jYXNhbEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiam9jYXNhbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiODY2MjAyNWEtMjViZS00Nzc3LWFlNTQtNjZjYjZlNTg5MjllIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3Mjk3OTIzMzR9XSwic2Vzc2lvbl9pZCI6ImRkNWMzYWRkLWFmZjQtNDZlYy04NTVjLTAyYzAxM2UzYTI5ZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.BTjx7YW7M_j_YDpW1p8musGSMF1krNNyhypCw5DnHk8`;
  
  describe("Test de xarxa", async function () {
    const pelicula = await getMovie(
      "469b13d8-166f-4532-8efc-af805bf2b553",
      token
    );
    test("getMovie deuria retornar una promesa", function () {
      expect(getMovie("", "1234")).toBeInstanceOf(Promise);
    });
    test("getMovie deuria retornar una pelicula", async function () {
      expect(pelicula).toBeInstanceOf(Array);
      expect(pelicula[0]).toEqual(sabrina[0])
    });
  });
});
