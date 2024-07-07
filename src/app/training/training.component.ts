import { Component } from '@angular/core';
import { TrainingService } from './training.service';
import { Observable, Subscription } from 'rxjs';

interface AvailableExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.sass']
})
export class TrainingComponent {
  availableExercises:AvailableExercise[] = [];
  exerciseStatus: Observable<boolean> = new Observable<boolean>();

  constructor(private trainingService:TrainingService){}

  async ngOnInit() {
    await this.trainingService.getAvailableExercises().then(exercises => {
      console.log(exercises);
      this.availableExercises = exercises;
    })

    this.exerciseStatus = this.trainingService.exerciseEnds;
  }

}
