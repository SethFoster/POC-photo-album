import readline from "readline";
import {
  getAlbums,
  getAlbumById,
  getPhotoById,
} from "./services/api-client.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForInput = async () => {
  rl.question(
    "Enter a photo title, album ID, photo ID (example- photo:1), or 'quit' to exit. (Press Enter without a value to show all albums): ",
    async (input) => {
      if (input.toLowerCase() === "quit") {
        console.log("Exiting program...");
        rl.close();
        return;
      }

      if (input) {
        try {
          if (input.startsWith("photo:")) {
            const photoId = input.split(":")[1];
            console.log(`Fetching photo with ID: ${photoId}`);
            const photo = await getPhotoById(photoId);
            console.log(formatPhoto(photo));
          } else if (isNaN(input)) {
            console.log(`Searching for photos with title: "${input}"`);
            const albums = await getAlbums();
            const filteredPhotos = albums.flatMap((album) =>
              album.photos.filter((photo) => photo.title.includes(input))
            );
            console.log(filteredPhotos.map(formatPhoto).join("\n"));
          } else {
            const albumId = input;
            console.log(`Fetching photos for album with ID: ${albumId}`);
            const album = await getAlbumById(albumId);

            if (Array.isArray(album)) {
              console.log(album.map(formatPhoto).join("\n"));
            } else {
              console.error(
                `Error: Album with ID ${albumId} is not an array or no photos available.`
              );
            }
          }
        } catch (error) {
          console.error("Error: ", error.message);
        }
      } else {
        try {
          const albums = await getAlbums();
          albums.forEach((album) => {
            console.log(album.photos.map(formatPhoto).join("\n"));
          });
        } catch (error) {
          console.error("Error fetching albums:", error.message);
        }
      }

      askForInput();
    }
  );
};

askForInput();

const formatPhoto = (photo) => {
  return `[${photo.photoId}] ${photo.title}, album ${photo.albumId}, url: ${photo.url}`;
};
