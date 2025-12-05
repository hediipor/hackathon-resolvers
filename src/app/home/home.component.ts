import { Component, OnInit } from '@angular/core';
import { ImgSliderComponent } from "../img-slider/img-slider.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ImgSliderComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
