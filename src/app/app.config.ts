import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import {mockApiServices} from "./mock-api";
import {routes} from "./app-routing.module";
import {provideApp} from "./mock-api/app.provider";


export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(routes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
        ),
      provideApp({
            mockApi: {
                services: mockApiServices,
            },
        }),
    ],
};
