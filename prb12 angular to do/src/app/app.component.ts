import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: string[] = [];
  newTask: string = '';
  editingIndex: number | null = null;

  addTask() {
    if (this.newTask.trim()) {
      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex] = this.newTask;
        this.editingIndex = null;
      } else {
        this.tasks.push(this.newTask);
      }
      this.newTask = '';
    }
  }

  editTask(index: number) {
    this.newTask = this.tasks[index];
    this.editingIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editingIndex === index) {
      this.newTask = '';
      this.editingIndex = null;
    }
  }
}
