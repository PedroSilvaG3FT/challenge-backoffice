import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registrations.routing.module'
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'app/shared/angular-material/angular-materal.module';

import { MenuService } from './services/menu.service';
import { ExerciceService } from './services/exercice.service';
import { MenuItemService } from './services/menu-item.service';

import { MenuComponent } from './pages/menu/menu.component';
import { NewMenuComponent } from './pages/menu/new-menu/new-menu.component';

import { ExerciceComponent } from './pages/exercice/exercice.component';
import { NewExerciceComponent } from './pages/exercice//new-exercice/new-exercice.component';

import { AddMealModalComponent } from './components/modal/addMealModal/add-meal-modal.component'

@NgModule({
  declarations: [
    MenuComponent,
    NewMenuComponent,
    ExerciceComponent,
    NewExerciceComponent,
    AddMealModalComponent,
  ],
  providers: [
    MenuService,
    ExerciceService,
    MenuItemService
  ],
  imports: [
    RegistrationRoutingModule,
    AngularMaterialModule,
    CommonModule,
    HttpClientModule,
    FuseSharedModule,
    FuseWidgetModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8',
    }),
  ],
  exports: [
    RegistrationRoutingModule, 
  ]
})
export class RegistrationModule { }