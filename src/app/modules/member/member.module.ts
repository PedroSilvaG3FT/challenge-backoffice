import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member.routing.module';

import { AngularMaterialModule } from 'app/shared/angular-material/angular-materal.module';
import { HttpClientModule } from '@angular/common/http';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { AngularEditorModule } from '@kolkov/angular-editor'

import { MemberComponent } from './pages/member/member.component';
import { MemberDetailComponent } from './pages/member/member-detail/member-detail.component';
import { MemberApprovalComponent } from './pages/member-approval/member-approval.component';
import { MenuMemberComponent } from './pages/member/member-detail/menu-member/menu-member.component';
import { ExerciseMemberComponent } from './pages/member/member-detail/exercise-member/exercise-member.component';
import { FinancialMemberComponent } from './pages/member/member-detail/financial-member/financial-member.component';

import { ExerciceUserService } from './services/exercice-user.service';

import { MenuUserService } from './services/menu-user.service';
import { UserService } from './services/user.service';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [
        MemberComponent,
        MenuMemberComponent,
        MemberDetailComponent,
        ExerciseMemberComponent,
        FinancialMemberComponent,
        MemberApprovalComponent,
    ],
    imports: [ 
        CommonModule,
        MemberRoutingModule,
        AngularMaterialModule,
        HttpClientModule,
        FuseSharedModule,
        FuseWidgetModule,
        AngularEditorModule,
        SharedModule
    ],
    exports: [MemberRoutingModule],
    providers: [
        MenuUserService,
        UserService,
        ExerciceUserService
    ],
})
export class MemberModule {}