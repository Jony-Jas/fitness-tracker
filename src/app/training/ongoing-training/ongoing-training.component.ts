import { Component } from '@angular/core';
import { TrainingService } from '../training.service';

interface AvailableExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
}

@Component({
  selector: 'app-ongoing-training',
  templateUrl: './ongoing-training.component.html',
  styleUrls: ['./ongoing-training.component.sass']
})
export class OngoingTrainingComponent {
  onGoingTraining!:AvailableExercise;
  progress: number = 0;
  timer: any;

  constructor(private trainingService:TrainingService){}

  ngOnInit() {
    this.onGoingTraining = this.trainingService.runningExercise;
    const duration = this.onGoingTraining.duration;
    this.startTimer(duration);
  }

  startTimer(duration: number) {
    // Calculate the increment per second
    const step = 100 / duration;

    this.timer = window.setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        this.trainingService.stopExercise({ completed: true });
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop(){
    this.trainingService.stopExercise({completed:false});
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
