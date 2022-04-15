import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { USER_TYPE } from "app/modules/member/constants/userType.constant";
import { MemberInterface } from "app/modules/member/interfaces/member.interface";
import { UserService } from "app/modules/member/services/user.service";
import { AngularEditorConfigShared } from "app/shared/config/angular-editor/angular-editor-config";
import { differenceInDays } from "date-fns";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
})
export class MemberDetailComponent implements OnInit {
  public title: string = "Detalhes Membro";
  public displayedColumns: string[] = [
    "id",
    "name",
    "initalWeight",
    "currentWeight",
    "goalWeek",
    "active",
    "action",
  ];

  public userId: number;
  public userType: number;

  public member: MemberInterface = {} as MemberInterface;

  public angularEditorConfigShared = new AngularEditorConfigShared();
  public configEditor = this.angularEditorConfigShared.default();

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.initMember();
  }

  get currentDay() {
    const _initalDay = new Date(this.member.dateApproval);
    const _currentDay = new Date();

    return differenceInDays(_currentDay, _initalDay);
  }

  get isFaithfulness() {
    return this.member.type === USER_TYPE.faithfulness;
  }

  initMember() {
    this.activatedRoute.data.subscribe(({ userType }) => {
      this.userType = userType;
      this._getUser();
    });
  }

  _getUser() {
    this.userService.getById(this.userId).subscribe(
      (response) => (this.member = response),
      (error) => console.error("Error :", error)
    );
  }

  saveUser() {
    this.member.goalWeek = Number(this.member.goalWeek);

    const memberUpdateDTO: MemberInterface = {
      id: Number(this.member.id),
      goalWeek: Number(this.member.goalWeek),
      goalWeight: Number(this.member.goalWeight),
      startingWeight: Number(this.member.startingWeight),
    } as MemberInterface;

    this.userService.update(memberUpdateDTO).subscribe(
      (response) => {
        alert("Atualizado com Sucesso");
        this.router.navigate(["member/list"]);
      },
      (error) => alert("Erro ao atualizar")
    );
  }

  updateStatusUser() {
    const memberUpdateDTO: MemberInterface = {
      id: Number(this.member.id),
      active: !this.member.active,
    } as MemberInterface;

    if (memberUpdateDTO.active) memberUpdateDTO.dateApproval = new Date();

    this.userService.update(memberUpdateDTO).subscribe(
      () => {
        alert("Atualizado com Sucesso");
        this._getUser();
      },
      () => alert("Erro ao atualizar")
    );
  }

  updateCurrentWeight() {
    this.userService
      .createCurrentWeight({
        userId: Number(this.member.id),
        weight: this.member.currentWeight,
      })
      .subscribe(() => {});
  }

  toggleUserType() {
    if (this.isFaithfulness) this.updateUserType(USER_TYPE.challenge);
    else this.updateUserType(USER_TYPE.faithfulness);
  }

  updateUserType(userType: number) {
    const memberUpdateDTO: MemberInterface = {
      id: Number(this.member.id),
      type: userType,
    } as MemberInterface;

    if (userType === USER_TYPE.faithfulness)
      memberUpdateDTO.dateApproval = new Date();

    this.userService.update(memberUpdateDTO).subscribe(
      () => {
        alert("Atualizado com Sucesso");
        this._getUser();
      },
      () => alert("Erro ao atualizar")
    );
  }
}
