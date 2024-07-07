import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { OngoingTrainingComponent } from './ongoing-training/ongoing-training.component';
import { StartTrainingComponent } from './start-training/start-training.component';
import { TrainingService } from './training.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    OngoingTrainingComponent,
    StartTrainingComponent
  ],
  imports: [
    CommonModule,
    FirestoreModule,
    RouterModule.forChild([{
      path: '', component: TrainingComponent
    }]),
    SharedModule
  ],
  providers: [
    TrainingService
  ]
})
export class TrainingModule { }
