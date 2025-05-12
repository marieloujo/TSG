import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session } from '../sessions.interface';

@Component({
  selector: 'app-session-item',
  imports: [NgIf, DatePipe, CommonModule],
  templateUrl: './session-item.component.html'
})
export class SessionItemComponent {
  @Input() session: Session | undefined

  get progressValue(): number {
    return this.session ? this.calculateProgress(this.session.start_time, this.session.duration) : 0;
  }

  get progressBarClass(): string {
    return this.progressValue < 50
      ? 'bg-secondary'
      : this.progressValue < 100
      ? 'bg-warning'
      : 'bg-success';
  }

  calculateProgress(startTime?: string, duration?: number): number {
    if (!startTime || !duration) {
      return 0;
    }

    // Convert startTime to a Date object and get its timestamp
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const end = start + duration * 60 * 1000;
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

}
