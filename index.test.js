import axios from "axios";
import { fetchAlbumData, getAlbums } from "./index";

jest.mock("axios");

describe("get photo album data from url", () => {
  it("fetches successfully data from API", async () => {
    const data = [
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
      },
      {
        albumId: 1,
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796",
      },
      {
        albumId: 1,
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        url: "https://via.placeholder.com/600/24f355",
        thumbnailUrl: "https://via.placeholder.com/150/24f355",
      },
      {
        albumId: 1,
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        url: "https://via.placeholder.com/600/d32776",
        thumbnailUrl: "https://via.placeholder.com/150/d32776",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: data });

    const result = await fetchAlbumData(1);

    expect(result).toEqual(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/photos?albumId=1`
    );
  });

  it("API throws an error", async () => {
    const message = "Network Error";
    axios.get.mockRejectedValueOnce(new Error(message));
    axios.get.mockRejectedValueOnce(new Error(message));

    const response = await fetchAlbumData(1);

    expect(axios.get).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/photos?albumId=1`
    );

    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(message);
  });
});

describe("get multiple albums at once", () => {
  it("fetches all albums", async () => {
    const albums = [1, 2, 3, 4];

    const data = [
      [
        {
          albumId: 1,
          id: 1,
          title: "accusamus beatae ad facilis cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
      ],
      [
        {
          albumId: 2,
          id: 2,
          title: "reprehenderit est deserunt velit ipsam",
          url: "https://via.placeholder.com/600/771796",
          thumbnailUrl: "https://via.placeholder.com/150/771796",
        },
      ],
      [
        {
          albumId: 3,
          id: 3,
          title: "officia porro iure quia iusto qui ipsa ut modi",
          url: "https://via.placeholder.com/600/24f355",
          thumbnailUrl: "https://via.placeholder.com/150/24f355",
        },
      ],
      [
        {
          albumId: 4,
          id: 4,
          title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
          url: "https://via.placeholder.com/600/d32776",
        },
      ],
    ];

    axios.get.mockResolvedValueOnce({ data: data[0] });
    axios.get.mockResolvedValueOnce({ data: data[1] });
    axios.get.mockResolvedValueOnce({ data: data[2] });
    axios.get.mockResolvedValueOnce({ data: data[3] });

    const res = await getAlbums(albums);

    expect(res).toEqual(data);
  });

  it("albums call has an error", async () => {
    const message = "Network Error";

    const data = [
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
      },
    ];

    axios.get.mockRejectedValueOnce(
      new Error(message, { response: { statusCode: 404 } })
    );
    axios.get.mockResolvedValueOnce({ data: data });

    const albums = [1, 2];

    const response = await getAlbums(albums);
  });
});
