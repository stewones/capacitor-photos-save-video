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

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  // video
  // public url: string = `https://cdn-dev.inflcr.com/Event/10252/conversions/IMG_3191-small.mp4?response-content-disposition=attachment%3Bfilename%3DIMG_3191-small.mp4&Expires=1547645921&Signature=mtFB-9Epk08iucLE~tpxH8p3UgKBhn8xijfiDIiRUzpqZ883KKyZr6Ix4XTiJNjnp7oIfSPckpCxxarN38MKCrRi5OcAK~wOIDsqFz6NyPSaUdjiNyuk9T4DjIaqa4VKFLsutUc8O2zk2K3s6SHPhAOly~-xDRCZIJKGbUTImfl4i~VuYUcF3VyW3CSi6FEcTglJH9TV8cME8IbB0ZrMKn7hdI7maNtMG4qjqGo9npz-~zqc5gOuG6EFg~lugCA-BCrRu5dJYJUGB6wDiIQ4Vlv6sCPClmSgDAjVryTLPPVooQmzI7kqjKqdOUqyJFiD3JftTlIkkLCaukChqrL1gg__&Key-Pair-Id=APKAJ5AKQ3EML2QIWOJA`;

  // gif
  public url: string = `https://cdn-dev.inflcr.com/Event/10053/giphy.gif?response-content-disposition=attachment%3Bfilename%3Dgiphy.gif&Expires=1547659519&Signature=cSZzSxLqQ5VyD0eSPaCQE5j9x~j0LKhS8z5A~38zAz8btSNUDoZFvsDPAPySbn9QVMGY69xoGQQncrGvN1lnxf7rJJUGAxt2QGVyxMka8cmE36AV5IdI-3ZwmJf4GmrMfubVELCfio4HO9gTLCeQUGJHsWMRRtgT5c9DfHN3C9rARsA25fbzg2W8QJBrzgWeNUzywC~60i0SZMSWkK25et~shrKKXjIicHhMXP8yymbpOFUgGhKTldMrc0rWTEirTLtu4A5zK13MaOQQCKUyvi1BYyYx5W-mcsfFC4uSFm1GwV6vYK7ObjveB0CxacTYFtkSmABoCj4o3mbaWu9D4Q__&Key-Pair-Id=APKAJ5AKQ3EML2QIWOJA`;

  constructor(private fileTransfer: FileTransfer, private file: File) {}

  save() {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const path = this.file.dataDirectory + "my-video.mp4";
    fileTransfer
      .download(this.url, path, true)
      .then(async r => {
        Plugins.Photos.getAlbums().then(async albums => {
          const album = albums.albums.filter(
            album => album.name.toUpperCase() === "INFLCR"
          )[0];

          Plugins.Photos.saveVideo({
            data: r.nativeURL,
            albumIdentifier: album && album.identifier
          })
            .then(r => {
              console.log(r);
              alert(`success`);
            })
            .catch(err => {
              console.log(err);
              alert(`err`);
            });
        });
      })
      .catch(console.log);
  }
}
