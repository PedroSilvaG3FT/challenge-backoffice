import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { MemberComponent } from "./pages/member/member.component";
import { AssignMenuComponent } from "./pages/assign-menu/assign-menu.component";
import { AssignExerciceComponent } from "./pages/assing-exercice/assign-exercice.component";
import { MemberDetailComponent } from "./pages/member/member-detail/member-detail.component";
import { MemberApprovalComponent } from "./pages/member-approval/member-approval.component";

const routes: Routes = [
  { path: "list", component: MemberComponent },
  { path: "member-detail/:id", component: MemberDetailComponent },
  { path: "member-aproval", component: MemberApprovalComponent },
  { path: "assign-menu", component: AssignMenuComponent },
  { path: "assign-exercice", component: AssignExerciceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
