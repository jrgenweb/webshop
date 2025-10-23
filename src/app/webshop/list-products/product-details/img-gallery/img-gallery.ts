import { Component, Input, OnInit } from '@angular/core';
import { FallbackImagePipe } from '../../../../shared/pipes/fallback-image-pipe';

@Component({
  selector: 'app-img-gallery',
  imports: [FallbackImagePipe],
  templateUrl: './img-gallery.html',
  styleUrl: './img-gallery.scss',
})
export class ImgGallery implements OnInit {
  @Input() images!: string[];
  @Input() title!: string;

  selectedImage!: string;

  ngOnInit(): void {
    this.selectedImage = this.images[0];
    // this.images.push(...this.images);
  }

  showImage(image: string) {
    this.selectedImage = image;
  }
}
