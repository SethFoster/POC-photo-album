import mockedAxios from "axios"; // Mock AXIOS Library - https://stackoverflow.com/questions/51393952/mock-inner-axios-create
import { getPhotoById, getAlbums, getAlbumById } from "../services/api-client";

jest.mock("axios");

describe("API Client", () => {
  it("should fetch photo by ID successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        photoId: 1,
        url: "https://showcase.leantechniques.com/image/photo-10.jpg",
        albumId: 1,
        title: "Work From Anywhere",
      },
    });

    const photo = await getPhotoById(1);

    expect(photo.photoId).toBe(1);
    expect(photo.title).toBe("Work From Anywhere");
    expect(photo.url).toBe(
      "https://showcase.leantechniques.com/image/photo-10.jpg"
    );
  });

  it("should throw an error if photo fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getPhotoById(1)).rejects.toThrow("Network Error");
  });

  it("should fetch all albums successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          albumId: 2,
          photos: [
            {
              photoId: 7,
              url: "https://showcase.leantechniques.com/image/welcome.jpg",
              albumId: 2,
              title: "LT Welcome",
            },
            {
              photoId: 8,
              url: "https://showcase.leantechniques.com/image/jason-peyton.jpg",
              albumId: 2,
              title: "Jason and Peyton",
            },
          ],
        },
        {
          albumId: 3,
          photos: [
            {
              photoId: 10,
              url: "https://showcase.leantechniques.com/image/roy.jpg",
              albumId: 3,
              title: "Roy ten Brink",
            },
            {
              photoId: 11,
              url: "https://showcase.leantechniques.com/image/nick.jpg",
              albumId: 3,
              title: "Nick Neely and Batman",
            },
          ],
        },
        {
          albumId: 4,
          photos: [
            {
              photoId: 12,
              url: "https://showcase.leantechniques.com/image/ward.jpg",
              albumId: 4,
              title: "Daniel Ward",
            },
          ],
        },
      ],
    });

    const albums = await getAlbums();

    expect(albums.length).toBe(3);
    expect(albums[0].albumId).toBe(2);
    expect(albums[0].photos.length).toBe(2);
    expect(albums[0].photos[0].photoId).toBe(7);
    expect(albums[0].photos[0].title).toBe("LT Welcome");
  });

  it("should throw an error if fetching albums fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Error fetching albums"));

    await expect(getAlbums()).rejects.toThrow("Error fetching albums");
  });

  it("should fetch album by ID successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          photoId: 1,
          url: "https://showcase.leantechniques.com/image/photo-10.jpg",
          albumId: 1,
          title: "Work From Anywhere",
        },
      ],
    });

    const album = await getAlbumById(1);

    expect(album.length).toBe(1);
    expect(album[0].photoId).toBe(1);
    expect(album[0].url);
    expect(album[0].albumId).toBe(1);
    expect(album[0].title).toBe("Work From Anywhere");
  });

  it("should throw an error if album fetch fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Error fetching album"));

    await expect(getAlbumById(1)).rejects.toThrow("Error fetching album");
  });
});
