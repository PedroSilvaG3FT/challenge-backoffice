import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { TranslateModule } from "@ngx-translate/core";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
  FuseLoadingModule,
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from "@fuse/components";
import { fuseConfig } from "app/fuse-config";
import { FakeDbService } from "app/fake-db/fake-db.service";

import { AppComponent } from "app/app.component";
import { AppStoreModule } from "app/store/store.module";
import { LayoutModule } from "app/layout/layout.module";
import { ExempleModule } from "./modules/exemple/exemple.module";
import { SharedModule } from "app/shared/shared.module";
import { AuthGuard } from "app/shared/guards/auth.guard";
import { LOCALE_ID } from "@angular/core";

const appRoutes: Routes = [
  {
    path: "exemple",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/exemple/exemple.module").then((m) => m.ExempleModule),
  },
  {
    path: "registration",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/registration/registrations.module").then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: "member",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/member/member.module").then((m) => m.MemberModule),
  },
  {
    path: "apps",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./main/apps/apps.module").then((m) => m.AppsModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./main/pages/pages.module").then((m) => m.PagesModule),
  },

  { path: "**", redirectTo: "/auth/login" },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),

    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseLoadingModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    AppStoreModule,
    ExempleModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
