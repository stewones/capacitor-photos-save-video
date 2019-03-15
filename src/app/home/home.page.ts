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
import {
  Downloader,
  DownloadEventData,
  ProgressEventData
} from "capacitor-downloader";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  downloadManager: Downloader = new Downloader();

  public albumName: string = `MY AWESOME ALBUM`;

  public videoUrl: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  public videoUrlPoster: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg";

  public gifUrl: string = `https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif`;

  constructor(
    private fileTransfer: FileTransfer,
    private file: File,
    private loading: LoadingController
  ) {
    // Plugins.Photos.getAlbums().then(r => console.log("success response", r));
    // Plugins.Photos.createAlbum({ name: this.albumName })
    //   .then(r => console.log("success response", r))
    //   .catch(err => console.log("ERROR", err));

    this.saveGif();
  }

  async saveVideo() {
    const loader = await this.loading.create(<any>{
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
        console.log(`ALBUM NAME`, album);
        if (!album) {
          await this.createAlbum().catch(err => alert(`Cant create album`));
          album = await this.getAlbum().catch(err => alert(`Cant get album`));
        }

        Plugins.Photos.saveGif({
          data: r.nativeURL,
          albumIdentifier: (album && album.identifier) || album
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
      .catch(err => console.log("FILE TRANSFER ERROR", err));

    // const data = await this.downloadManager.createDownload({
    //   url: this.gifUrl
    //   //'https://wallpaperscraft.com/image/hulk_wolverine_x_men_marvel_comics_art_99032_3840x2400.jpg'
    // });
    // const imageDownloaderId = data.value;
    // this.downloadManager.initialize();
    // this.downloadManager
    //   .start({ id: imageDownloaderId }, (progressData: ProgressEventData) => {
    //     console.log(`Progress : ${progressData.value}%`);
    //     console.log(`Current Size : ${progressData.currentSize}%`);
    //     console.log(`Total Size : ${progressData.totalSize}%`);
    //     console.log(`Download Speed in bytes : ${progressData.speed}%`);
    //   })
    //   .then((completed: DownloadEventData) => {
    //     console.log(`Image : ${completed.path}`);
    //   })
    //   .catch(err => console.log("FILE TRANSFER ERROR", err));
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
