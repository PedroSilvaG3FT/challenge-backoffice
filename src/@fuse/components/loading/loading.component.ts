import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { LoadingService } from "./loading.service";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "fuse-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FuseLoadingComponent implements OnInit, OnDestroy {
  public value: number;
  public message: string;
  public visible: boolean;
  public bufferValue: number;
  private _unsubscribeAll: Subject<any>;

  constructor(private loadingService: LoadingService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.mapEvents();
  }

  mapEvents() {
    this.loadingService.bufferValue
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((bufferValue) => (this.bufferValue = bufferValue));

    this.loadingService.value
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => (this.value = value));

    this.loadingService.message
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => (this.message = value));

    this.loadingService.visible
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((visible) => (this.visible = visible));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
