import { Component } from '@angular/core';
import { HeaderComponent} from './header/header.component';
import { LandingComponent} from './landing/landing.component';
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
