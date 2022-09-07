const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "baa65a100558c5050bc7e4f205d4ea94",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
export default apiConfig;
