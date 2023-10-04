import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../Services/task/task.service";
import {Task} from "../models/task/task";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  fromDate: any;
  toDate: any;
  displayedColumns: string[] = ['id', 'title', 'dueDate', 'completed', 'actions'];

  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private http:HttpClient,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.loadTasks()
  }
  loadTasks() {
    // Replace 'your-api-endpoint' with the actual endpoint of your Spring Boot API
    const apiUrl = `http://localhost:8080/api/tasks`; // Update with your actual endpoint
    this.http.get<Task[]>(apiUrl)
      .subscribe(tasks => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
      });
  }

  filterTasksdate() {
    const dateFromFormatted = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    const dateToFormatted = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');

    // Check if both fromDate and toDate are null or undefined
    const isDateRangeEmpty = !dateFromFormatted && !dateToFormatted;

    const apiUrl = isDateRangeEmpty
      ? 'http://localhost:8080/api/tasks'  // Fetch all tasks
      : `http://localhost:8080/api/tasks/duedate?from=${dateFromFormatted}&to=${dateToFormatted}`;

    this.http.get<Task[]>(apiUrl).subscribe(tasks => {
      this.tasks = tasks;
      this.dataSource = new MatTableDataSource(this.tasks);
    });
  }
  resetDate(){
    this.fromDate=null
    this.toDate=null
  }




  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      (res) => {
        console.log('task deleted successfully.',res);
        this.loadTasks()
      }
      )
  }
}
