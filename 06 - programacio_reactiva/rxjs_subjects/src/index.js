import { of } from "rxjs";
import { map, filter, reduce, buffer, throttleTime, throttle, debounceTime } from "rxjs/operators";
import { Observable, from } from "rxjs";

import { Subject } from 'rxjs';
import { fromEvent } from "rxjs";
import { BehaviorSubject } from 'rxjs';

fromEvent(document,'DOMContentLoaded').subscribe(()=>{
  const subject = new Subject();
  subject.subscribe({  // li pasen un objecte literal observer amb next implementat
    next: (v) => console.log(`observerA: ${v}`)
  });
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
  subject.next(1);
  subject.next(2);

  const observable = from([10, 20, 30]);
 
  observable.subscribe(subject); // You can subscribe providing a Subject


  const bSubject = new BehaviorSubject(100); // 0 is the initial value
   
  bSubject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
  });
   
  bSubject.next(101);
  bSubject.next(102);
   
  bSubject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
   
  bSubject.next(103);
   
  // Logs
  // observerA: 0
  // observerA: 1
  // observerA: 2
  // observerB: 2
  // observerA: 3
  // observerB: 3
});



