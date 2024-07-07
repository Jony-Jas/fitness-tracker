import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, Timestamp, collection, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface ExerciseData {
  name: string;
  calories: number;
  duration: number;
  completed: boolean;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'calories', 'duration', 'completed', 'date'];
  dataSource: ExerciseData[] = [];
  private unsubscribe!: Unsubscribe;

  constructor(private firestore: Firestore, public router:Router) { }

  ngOnInit() {
    this.subscribeToExercises();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private subscribeToExercises() {
    const exerciseCollection = collection(this.firestore, 'doneExercises');
    
    this.unsubscribe = onSnapshot(exerciseCollection, (snapshot) => {
      this.dataSource = snapshot.docs.map(doc => {
        const data = doc.data() as ExerciseData;
        if (data.date instanceof Timestamp) {
          data.date = data.date.toDate();
        } else if (!(data.date instanceof Date)) {
          data.date = new Date(data.date);
        }
        return { ...data, id: doc.id };
      });
    }, (error) => {
      console.error("Error fetching exercises:", error);
    });
  }
}