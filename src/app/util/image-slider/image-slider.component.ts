import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit {
  @Input() images: String[] = [];
  currentImageIndex: number = 0;
  slideshowInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    this.clearSlideshowInterval();
  }


  startSlideshow(): void {
    this.clearSlideshowInterval();
    this.slideshowInterval = setInterval(() => {
      this.nextImage();
    }, 6000);
  }

  clearSlideshowInterval(): void {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.startSlideshow();
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.startSlideshow();
  }
}
