import { Injectable } from "@angular/core";
import { Log } from "../models/log";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private logs: Log[];

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   { id: "1", text: "Generated Component", date: new Date("12/26/2022 12:53:23") },
    //   { id: "2", text: "Generated Component One", date: new Date("12/25/2022 12:53:23") },
    //   { id: "3", text: "Generated Component Two", date: new Date("12/24/2022 12:53:23") },
    // ];

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }

    return of(this.logs.sort((a, b) => b.date - a.date));
  }

  setFormLog(log: Log): void {
    this.logSource.next(log);
  }

  addLog(log: Log): void {
    this.logs.unshift(log);

    //local storage
    this.updateLocalStorage();
  }

  updateLog(log: Log): void {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    this.updateLocalStorage();
  }

  deleteLog(log: Log): void {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.updateLocalStorage();
  }

  clearState() {
    this.stateSource.next(true);
  }

  private updateLocalStorage() {
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
}
