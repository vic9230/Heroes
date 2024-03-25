import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'go-back-button',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './go-back-button.component.html'
})
export class GoBackButtonComponent {
  constructor(private location: Location) {
  }

  goBack(): void {
    const path = this.location.path().split('/');
    path.pop();
    this.location.back();
  }

}
