import { Component, OnInit } from '@angular/core';
import { ChartgaugeComponent} from '../chartgauge/chartgauge.component';
import { ChartlineComponent} from '../chartline/chartline.component';
import { ChartmonthlyComponent} from '../chartmonthly/chartmonthly.component';
import { SidemenuComponent} from '../sidemenu/sidemenu.component';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  collapsed: boolean;
  datacardload = cardload;
  constructor() { }

  ngOnInit() {
  }
}

export var cardload = [
  {
    "name": "ACQ"
  },
  {
    "name": "MUF Survey"
  },
  {
    "name": "MUFON"
  }
];
