import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member.routing.module';

import { AngularMaterialModule } from 'app/shared/angular-material/angular-materal.module';
import { HttpClientModule } from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

import { MenuUserService } from './services/menu-user.service';
import { MemberComponent } from './pages/member/member.component';
import { MemberDetailComponent } from './pages/member/member-detail/member-detail.component';
import { MemberApprovalComponent } from './pages/member-approval/member-approval.component';
import { MenuMemberComponent } from './pages/member/member-detail/menu-member/menu-member.component';
@NgModule({
    declarations: [
        MemberComponent,
        MemberDetailComponent,
        MemberApprovalComponent,
        MenuMemberComponent
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
    providers: [MenuUserService],
})
export class MemberModule {}