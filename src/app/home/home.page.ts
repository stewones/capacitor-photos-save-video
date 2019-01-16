import { Component } from "@angular/core";
import {
  Plugins,
  PhotosResult,
  FilesystemDirectory,
  FilesystemEncoding
} from "@capacitor/core";
import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public albumName: string = `AWESOME`;

  // video
  public videoUrl: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  public videoUrlPoster: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg";

  // gif
  public gifUrl: string = `https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif`;

  constructor(
    private fileTransfer: FileTransfer,
    private file: File,
    private loading: LoadingController
  ) {}

  async saveVideo() {
    const loader = await this.loading.create({
      showBackdrop: true,
      backdropDismiss: true
    });
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const path = this.file.dataDirectory + "my-video.mp4";

    loader.present();

    fileTransfer
      .download(this.videoUrl, path, true)
      .then(async r => {
        let album: any = await this.getAlbum().catch(err =>
          alert(`Cant get album`)
        );

        if (!album) {
          await this.createAlbum().catch(err => alert(`Cant create album`));
          album = await this.getAlbum().catch(err => alert(`Cant get album`));
        }
        Plugins.Photos.saveVideo({
          data: r.nativeURL,
          albumIdentifier: album && album.identifier
        })
          .then(r => {
            loader.dismiss();
            console.log(r);
            alert(`success, video saved`);
          })
          .catch(err => {
            loader.dismiss();
            console.log(err);
            alert(`err`);
          });
      })
      .catch(console.log);
  }

  async saveGif() {
    const loader = await this.loading.create({ showBackdrop: true });
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const path = this.file.dataDirectory + "my-video.gif";
    loader.present();

    fileTransfer
      .download(this.gifUrl, path, true)
      .then(async r => {
        let album: any = await this.getAlbum().catch(err =>
          alert(`Cant get album`)
        );

        if (!album) {
          await this.createAlbum().catch(err => alert(`Cant create album`));
          album = await this.getAlbum().catch(err => alert(`Cant get album`));
        }

        Plugins.Photos.saveGif({
          data: r.nativeURL,
          albumIdentifier: album && album.identifier
        })
          .then(r => {
            loader.dismiss();
            console.log(r);
            alert(`success! gif saved`);
          })
          .catch(err => {
            loader.dismiss();
            console.log(err);
            alert(`err`);
          });
      })
      .catch(console.log);
  }

  async createAlbum() {
    let ret = await Plugins.Photos.createAlbum({
      name: this.albumName
    });
    console.log("album created");
  }

  async getAlbum() {
    return new Promise((resolve, reject) => {
      Plugins.Photos.getAlbums()
        .then(async albums => {
          const album = albums.albums.filter(
            album => album.name.toUpperCase() === this.albumName
          )[0];
          resolve(album);
        })
        .catch(reject);
    });
  }
}
