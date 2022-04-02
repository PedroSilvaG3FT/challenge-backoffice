import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import {
  DayExerciceMemberInterface,
  ExerciceUserInterfaceDTO,
  ItemExerciceMemberInterface,
} from "../../interfaces/exercice-member.interface";
import { DayEnum } from "app/modules/registration/pages/menu/new-menu/new-menu.component";
import { ExerciceUserService } from "../../services/exercice-user.service";

@Component({
  selector: "assign-exercice-member",
  templateUrl: "assign-exercice-member.component.html",
  styleUrls: ["./assign-exercice-member.component.scss"],
})
export class AssignExerciceMemberComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public exerciceUserService: ExerciceUserService,
    public dialogRef: MatDialogRef<AssignExerciceMemberComponent>
  ) {}

  public isWeek: boolean = true;
  public userId: number;
  public newDay: number;
  public currtenDayId: number = 1;
  public currentDayCopy: any;

  public days: DayExerciceMemberInterface[] = [];
  public week = {
    exercices: [],
  };

  ngOnInit() {
    this.getExercicesMember();
  }

  get isWeekLabel() {
    return !this.isWeek ? "Exercicio para semana" : "Exercicio por dia";
  }

  toggleIsWeek() {
    this.isWeek = !this.isWeek;
  }

  // #region By Week
  addExerciceWeek() {
    const newExercice: ItemExerciceMemberInterface = {
      amount: "",
      isLink: true,
      exercice: null,
    };

    this.week.exercices.push(newExercice);
  }
  onChangeTypeWeek(indexExercice: number) {
    const exercice = this.week.exercices[indexExercice];

    if (exercice.isLink) {
      exercice.amount = null;
      exercice.exercice = null;
    } else exercice.linkUrl = "";
  }

  onChangeExerciceWeek(result, indexExercice: number) {
    this.week.exercices[indexExercice].exercice = result;
  }

  removeExerciceWeek(indexExercice: number) {
    this.week.exercices.splice(indexExercice, 1);
  }
  // #endregion By Week

  // #region By Day
  getExercicesMember() {
    this.exerciceUserService.getByUserId(this.userId).subscribe(
      (response) => {
        this.days = response;
        this.currtenDayId = this.days.length + 1;
      },
      (error) => console.error("ERRO :", error)
    );
  }

  clearExercices() {
    this.exerciceUserService.removeAll(this.userId).subscribe(
      (response) => {
        this.getExercicesMember();
      },
      (error) => console.error("ERROR :", error)
    );
  }

  addDay() {
    if (this.currtenDayId === 8) {
      this.currtenDayId = 1;
    }

    const newDay: any = {
      dayId: this.currtenDayId,
      name: DayEnum[this.currtenDayId],
      exercices: [],
    };

    this.days.push(newDay);
    this.currtenDayId++;
  }

  removeDay(index: number) {
    this.days.splice(index, 1);
    this.currtenDayId--;
  }

  addExercice(day, indexDay) {
    const newExercice: ItemExerciceMemberInterface = {
      amount: "",
      isLink: true,
      exercice: null,
    };

    this.days[indexDay].exercices.push(newExercice);
  }

  removeExercice(indexDay: number, indexExercice: number) {
    this.days[indexDay].exercices.splice(indexExercice, 1);
  }

  onChangeExercice(result, indexDay: number, indexExercice: number) {
    this.days[indexDay].exercices[indexExercice].exercice = result;
  }

  onChangeType(indexDay: number, indexExercice: number) {
    const exercice = this.days[indexDay].exercices[indexExercice];

    if (exercice.isLink) {
      exercice.amount = null;
      exercice.exercice = null;
    } else exercice.linkUrl = "";
  }
  // #endregion By Day

  // #region Actions

  handleSave() {
    const getModel = () => {
      if (this.isWeek) {
        const { exercices } = this.week;
        const days = [1, 2, 3, 4, 5, 6, 7];

        return days.map((dayId) => ({ dayId, exercices }));
      } else {
        return this.days.map((day) => {
          return {
            dayId: day.dayId,
            exercices: day.exercices.map((exercices) => {
              return {
                amount: exercices.amount || null,
                linkUrl: exercices.linkUrl || null,
                exercice: exercices.exercice?.id || null,
              };
            }),
          };
        });
      }
    };

    const exerciceDTO = getModel();
    this.dialogRef.close(exerciceDTO);
  }

  handleCancel() {
    this.dialogRef.close();
  }
  // #endregion Actions
}
