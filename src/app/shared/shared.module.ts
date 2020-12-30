import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FuseWidgetModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { AngularMaterialModule } from './angular-material/angular-materal.module';

import { MenuSharedService } from './services/menu-shared.service';

import { AssingMenuModalComponent } from './components/assing-menu-modal/assing-menu-modal.component';

@NgModule({
    imports: [
        AngularMaterialModule,
        CommonModule,
        FuseSharedModule,
        HttpClientModule,
        FuseWidgetModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8',
        }),
    ],
    exports: [AssingMenuModalComponent],
    declarations: [AssingMenuModalComponent],
    providers: [
        MenuSharedService
    ],
})
export class SharedModule { }
