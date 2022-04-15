import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { MemberComponent } from "./pages/member/member.component";
import { AssignMenuComponent } from "./pages/assign-menu/assign-menu.component";
import { AssignExerciceComponent } from "./pages/assing-exercice/assign-exercice.component";
import { MemberDetailComponent } from "./pages/member/member-detail/member-detail.component";
import { MemberApprovalComponent } from "./pages/member-approval/member-approval.component";
import { USER_TYPE } from "./constants/userType.constant";
const routes: Routes = [
  {
    path: "list",
    component: MemberComponent,
    data: { userType: USER_TYPE.challenge },
  },
  {
    path: "member-detail/:id",
    component: MemberDetailComponent,
    data: { userType: USER_TYPE.challenge },
  },
  {
    path: "member-aproval",
    component: MemberApprovalComponent,
    data: { userType: USER_TYPE.challenge },
  },
  {
    path: "assign-menu",
    component: AssignMenuComponent,
    data: { userType: USER_TYPE.challenge },
  },
  {
    path: "assign-exercice",
    component: AssignExerciceComponent,
    data: { userType: USER_TYPE.challenge },
  },

  {
    path: "faithfulness/list",
    component: MemberComponent,
    data: { userType: USER_TYPE.faithfulness },
  },
  {
    path: "faithfulness/assign-menu",
    component: AssignMenuComponent,
    data: { userType: USER_TYPE.faithfulness },
  },
  {
    path: "faithfulness/assign-exercice",
    component: AssignExerciceComponent,
    data: { userType: USER_TYPE.faithfulness },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
