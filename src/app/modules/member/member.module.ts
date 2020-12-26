import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member.routing.module';

import { AngularMaterialModule } from 'app/shared/angular-material/angular-materal.module';
import { HttpClientModule } from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

import { MemberComponent } from './pages/member/member.component';
import { MemberApprovalComponent } from './pages/member-approval/member-approval.component';
@NgModule({
    declarations: [
        MemberComponent,
        MemberApprovalComponent
    ],
    imports: [ 
        CommonModule,
        MemberRoutingModule,
        AngularMaterialModule,
        HttpClientModule,
        FuseSharedModule,
        FuseWidgetModule,
    ],
    exports: [MemberRoutingModule],
    providers: [],
})
export class MemberModule {}