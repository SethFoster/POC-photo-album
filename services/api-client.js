import axios from "axios";

export const client = axios.create({
  baseURL: process.env.API_BASE_URL || "https://showcase.leantechniques.com",
  headers: {
    lt_api_key: process.env.API_KEY || "lt_tech_showcase",
  },
});

export const getPhotoById = async (photoId) => {
  console.log(`Fetching photo with ID: ${photoId}`);

  try {
    const response = await client.get(`/photos/${photoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching photo:", error.message);
    throw error;
  }
};

export const getAlbums = async () => {
  console.log("Fetching all albums");

  try {
    const response = await client.get("/albums");
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error.message);
    throw error;
  }
};

export const getAlbumById = async (albumId) => {
  console.log(`Fetching album with ID: ${albumId}`);

  try {
    const response = await client.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching album:", error.message);
    throw error;
  }
};
