import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  NavigationCancel,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private _mode: BehaviorSubject<string>;
  private _value: BehaviorSubject<number>;
  private _message: BehaviorSubject<string>;
  private _visible: BehaviorSubject<boolean>;
  private _bufferValue: BehaviorSubject<number>;

  constructor(private _router: Router) {
    this._init();
  }

  get bufferValue(): Observable<any> {
    return this._bufferValue.asObservable();
  }

  setBufferValue(value: number): void {
    this._bufferValue.next(value);
  }

  get mode(): Observable<any> {
    return this._mode.asObservable();
  }

  setMode(value: "determinate" | "indeterminate" | "buffer" | "query"): void {
    this._mode.next(value);
  }

  get value(): Observable<any> {
    return this._value.asObservable();
  }

  setValue(value: number): void {
    this._value.next(value);
  }

  get visible(): Observable<any> {
    return this._visible.asObservable();
  }

  get message(): Observable<any> {
    return this._message.asObservable();
  }

  setMessage(value: string): void {
    this._message.next(value);
  }

  private _init(): void {
    this._value = new BehaviorSubject(0);
    this._message = new BehaviorSubject("");
    this._bufferValue = new BehaviorSubject(0);
    this._visible = new BehaviorSubject(false);
    this._mode = new BehaviorSubject("indeterminate");

    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.show());

    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationError ||
            event instanceof NavigationCancel
        )
      )
      .subscribe(() => this.hide());
  }

  show(message: string = ""): void {
    if (message) this.setMessage(message);
    this._visible.next(true);
  }

  hide(): void {
    this._visible.next(false);
    this.setMessage("");
  }
}
