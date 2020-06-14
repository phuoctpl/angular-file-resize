import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-resize-file';
  urlsAvatar;

  public onChange(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    const preview = document.getElementById('preview');

    fileReader.onloadend = (event: any) => {

      //tạo tag image, gán src bằng file image đã chọn
      const img = new Image();
      // @ts-ignore
      img.src = event.target.result;

      img.onload = () => {
        // tùy chỉnh độ dài rộng của image
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // set lại độ dài rộng của image
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        ctx.drawImage(img, 10, 10, 100, 100);

        // gán image data vào tag img
        // hiển thị
        this.urlsAvatar = canvas.toDataURL(file.type);
      };
    };

    fileReader.readAsDataURL(file);
  }
}
