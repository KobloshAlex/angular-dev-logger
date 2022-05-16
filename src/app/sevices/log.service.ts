import { Injectable } from "@angular/core";
import { Log } from "../models/log";

@Injectable({
  providedIn: "root",
})
export class LogService {
  logs: Log[];
  constructor() {
    this.logs = [
      { id: "1", text: "Generated Component", date: new Date("12/26/2022 12:53:23") },
      { id: "2", text: "Generated Component One", date: new Date("12/25/2022 12:53:23") },
      { id: "3", text: "Generated Component Two", date: new Date("12/24/2022 12:53:23") },
    ];
  }

  getLogs(): Log[] {
    return this.logs;
  }
}
