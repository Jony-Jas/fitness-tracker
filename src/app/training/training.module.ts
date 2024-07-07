import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { OngoingTrainingComponent } from './ongoing-training/ongoing-training.component';
import { StartTrainingComponent } from './start-training/start-training.component';



@NgModule({
  declarations: [
    TrainingComponent,
    OngoingTrainingComponent,
    StartTrainingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TrainingModule { }
