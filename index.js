import axios from "axios";

// photoAlbums is array [1, 2, 3 ... 100]. Decided to go this route with albumId being 1 to 100.

const photoAlbums = Array.from({ length: 100 }, (_, i) => i + 1);

// fetchAlbumData will retrieve album data for a given albumId.

export const fetchAlbumData = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAlbums = async (albums) => {
  try {
    const mapAlbums = albums.map(async (item) => {
      return await fetchAlbumData(item);
    });
    return await Promise.all(mapAlbums);
  } catch (error) {
    console.log(error);
    return error;
  }
};

getAlbums(photoAlbums).then((data) => {
  data.forEach((currentVal, index) => {
    // response will return array of arrays. Format photo-album to print array size (0 to 99) + 1
    console.log(`>photo-album ${index + 1}`);

    // for each array, print id and title together.
    currentVal.forEach((element) =>
      console.log(`[${element.id}] ${element.title}`)
    );

    console.log();
  });
});
