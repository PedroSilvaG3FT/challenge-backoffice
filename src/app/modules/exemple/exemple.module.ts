import { ExempleComponent } from './components/exempleComponent/exemple.component';
import { ExempleRoutingModule } from './exemple.routing.module'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-materal.module';

@NgModule({
  declarations: [
    ExempleComponent,
  ],
  providers: [],
  imports: [
    ExempleRoutingModule,
    AngularMaterialModule,
    CommonModule,
    HttpClientModule,
    FuseSharedModule,
    FuseWidgetModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8',
    }),

  ],
  exports: [ExempleRoutingModule]
})
export class ExempleModule { }