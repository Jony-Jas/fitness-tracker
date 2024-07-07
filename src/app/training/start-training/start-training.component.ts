import { Component, Input } from '@angular/core';
import { TrainingService } from '../training.service';

interface AvailableExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
}

@Component({
  selector: 'app-start-training',
  templateUrl: './start-training.component.html',
  styleUrls: ['./start-training.component.sass']
})
export class StartTrainingComponent {
  @Input()
  availableExercises: AvailableExercise[] = [];

  constructor(private trainingService: TrainingService) {}

  async onStartTraining(exercise: AvailableExercise) {
    await this.trainingService.startExercise(exercise);
  }
}
