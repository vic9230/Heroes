import {Component, OnInit} from '@angular/core';
import {ContentLoaderModule} from "@ngneat/content-loader";
import {NgIf} from "@angular/common";
import {LoadingService} from "../../services/loading/loading.service";

@Component({
  selector: 'app-fake-loading',
  templateUrl: './fake-loading.component.html',
  styleUrls: ['./fake-loading.component.scss'],
  imports: [
    ContentLoaderModule,
    NgIf
  ],
  standalone: true
})

export class FakeLoadingComponent implements OnInit {
  public isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.show$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
