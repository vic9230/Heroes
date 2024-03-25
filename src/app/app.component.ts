import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatDialogModule
  ],
  providers: [
  ],
})
export class AppComponent {
  title = 'Héroes';
}
