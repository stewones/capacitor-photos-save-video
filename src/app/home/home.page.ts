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

// import {
//   Downloader,
//   DownloadEventData,
//   ProgressEventData
// } from "capacitor-downloader";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  // downloadManager: Downloader = new Downloader();

  public albumName: string = `MY AWESOME ALBUM`;

  public videoUrl: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"; // a bigger video

  public videoUrlPoster: string =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg";

  public gifUrl: string = `https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif`;

  public photoUrl: string = `https://www.humanesociety.org/sites/default/files/2018/06/cat-217679.jpg`;

  constructor(
    private fileTransfer: FileTransfer,
    private file: File,
    private loading: LoadingController
  ) {
    // Plugins.Photos.getAlbums().then(r => console.log("success response", r));
    // Plugins.Photos.createAlbum({ name: this.albumName })
    //   .then(r => console.log("success response", r))
    //   .catch(err => console.log("ERROR", err));
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.saveGif();
    // }, 5000);
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
        // album handler (only ios)
        // let album: any = await this.getAlbum().catch(err =>
        //   alert(`Cant get album`)
        // );

        // if (!album) {
        //   await this.createAlbum().catch(err => alert(`Cant create album`));
        //   album = await this.getAlbum().catch(err => alert(`Cant get album`));
        // }
        Plugins.Photos.saveVideo({
          data: r.nativeURL,
          albumIdentifier: this.albumName
          // albumIdentifier: album && album.identifier
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
      .catch(err => {
        console.log(err);
      });
  }

  async saveGif() {
    const loader = await this.loading.create(<any>{
      showBackdrop: true,
      backdropDismiss: true
    });
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const path = this.file.dataDirectory + "my-video.gif";
    loader.present();

    fileTransfer
      .download(this.gifUrl, path, true)
      .then(async r => {
        loader.dismiss();

        // let album: any =
        //   (await this.getAlbum().catch(err => alert(`Cant get album`))) ||
        //   this.albumName;

        // if (!album) {
        //   await this.createAlbum().catch(err => alert(`Cant create album`));
        //   album = await this.getAlbum().catch(err => alert(`Cant get album`));
        // }
        //  alert(r.nativeURL);
        // console.log(`ALBUM NAME`, album, "NATIVE URL", r.nativeURL);

        Plugins.Photos.saveGif({
          data: r.nativeURL,
          albumIdentifier: this.albumName
          // albumIdentifier: (album && album.identifier) || album
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
      .catch(err => {
        console.log("FILE TRANSFER ERROR", err);
        loader.dismiss();
      });

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

  async savePhoto() {
    const loader = await this.loading.create(<any>{
      showBackdrop: true,
      backdropDismiss: true
    });
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const path = this.file.dataDirectory + "my-photo.jpg";
    loader.present();

    fileTransfer
      .download(this.photoUrl, path, true)
      .then(async r => {
        loader.dismiss();

        // let album: any =
        //   (await this.getAlbum().catch(err => alert(`Cant get album`))) ||
        //   this.albumName;

        // if (!album) {
        //   await this.createAlbum().catch(err => alert(`Cant create album`));
        //   album = await this.getAlbum().catch(err => alert(`Cant get album`));
        // }
        alert(r.nativeURL);
        // console.log(`ALBUM NAME`, album, "NATIVE URL", r.nativeURL);

        Plugins.Photos.savePhoto({
          data: r.nativeURL,
          albumIdentifier: this.albumName
          // albumIdentifier: (album && album.identifier) || album
        })
          .then(r => {
            loader.dismiss();
            console.log(r);
            alert(`success! jpg saved`);
          })
          .catch(err => {
            loader.dismiss();
            console.log(err);
            alert(`err`);
          });
      })
      .catch(err => {
        console.log("FILE TRANSFER ERROR", err);
        loader.dismiss();
      });

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
          console.log(albums.albums[0]);
          // const album = albums.albums.filter(
          //   album => album.name.toUpperCase() === this.albumName
          // )[0];
          // resolve(album);
        })
        .catch(reject);
    });
  }
}
