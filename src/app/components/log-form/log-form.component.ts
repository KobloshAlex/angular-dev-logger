import { Component, OnInit } from "@angular/core";
import { LogService } from "../../sevices/log.service";
import { Log } from "../../models/log";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-log-form",
  templateUrl: "./log-form.component.html",
  styleUrls: ["./log-form.component.css"],
})
export class LogFormComponent implements OnInit {
  constructor(private logService: LogService) {}

  id: string;
  text: string;
  date: any;

  isNew = true;

  ngOnInit(): void {
    this.logService.selectedLog.subscribe((log) => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      const newLog: Log = {
        id: uuidv4(),
        text: this.text,
        date: new Date(),
      };
      this.logService.addLog(newLog);
    } else {
      const updLog: Log = {
        id: this.id,
        text: this.text,
        date: new Date(),
      };
      this.logService.updateLog(updLog);
    }
  }

  clearStare() {
    this.isNew = true;
    this.id = "";
    this.text = "";
    this.date = "";
    this.logService.clearState();
  }
}
