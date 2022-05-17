import { Component, OnInit } from "@angular/core";
import { Log } from "../../models/log";
import { LogService } from "../../sevices/log.service";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"],
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedLog = { id: "", text: "", date: "" };
      }
      this.loaded = true;
    });

    this.logService.getLogs().subscribe((logs) => (this.logs = logs));
  }

  onSelect(log: Log): void {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if (confirm("are you sure?")) {
      this.logService.deleteLog(log);
    }
  }
}
