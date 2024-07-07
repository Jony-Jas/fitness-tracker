import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

export interface ExerciseData {
  name: string;
  calories: number;
  duration: number;
  completed: boolean;
  date: Date;
}

interface AvailableExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
}


@Injectable()
export class TrainingService {

  runningExercise!: AvailableExercise;
  exerciseEnds: Subject<boolean> = new Subject<boolean>();

  constructor(private firestore: Firestore) { }

  startExercise(exercise: AvailableExercise) {
    console.log("Starting Exercise: ", exercise);    
    this.runningExercise = exercise;
    this.exerciseEnds.next(true);
  }

  stopExercise(metaData:{completed:boolean}) {
    console.log("Stopping Exercise: ", metaData);
    this.exerciseEnds.next(false);
    this.addExercise({
      ...this.runningExercise,
      completed: metaData.completed,
      date: new Date()
    });
  }

  async addExercise(exercise: ExerciseData) {
    const exerciseCollection = collection(this.firestore, 'doneExercises');
    const exerciseToAdd = exercise;

    try {
      const docRef = await addDoc(exerciseCollection,exerciseToAdd);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async getAvailableExercises() {
    const exerciseCollection = collection(this.firestore, 'availabeExercises');
    const exerciseDocs = await getDocs(exerciseCollection);
      return exerciseDocs.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data()['name'],
          duration: doc.data()['duration'],
          calories: doc.data()['calories']
        }
      })
  }

}
