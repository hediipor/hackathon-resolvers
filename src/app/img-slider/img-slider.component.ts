import { Component, OnInit } from '@angular/core';

interface Slide {
  img: string;
  text: string;
}

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {

  slides: Slide[] = [
    { img: 'assets/linux.png', text: 'linux' },
    { img: 'assets/gimp.png', text: 'GIMP' },
    { img: 'assets/obs.png', text: 'OBS Studio' },
    { img: 'assets/LibreOffice_logo.svg.png', text: 'LibreOffice' }
  ];

  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
}
