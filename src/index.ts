import { Observable, Observer } from "rxjs";

const observer: Observer<any> = {
    next: (res) => console.log('num', res),
    error: (err: any) => console.warn(err),
    complete: () => console.log('Complete'),
};

const intervalo$ = new Observable<number>(subscriber => {
    let count = 0;
    // setInterval(() => {
    //     count++;
    //     subscriber.next(count);
    //     console.log('open Observable', count);
    // }, 2500);

    const intervalo = setInterval(() => {
        count++;
        subscriber.next(count);
        console.log('open Observable', count);
    }, 2500);

    setTimeout(() => {
        //Execute the return function immediately
        console.log('complete');
        subscriber.complete();
    }, 3000);

    //Return apply when call unsubscribe
    return () => {
        clearInterval(intervalo);
        console.log('The interval has been destroy');
    }
});

//Init subscriptions
const subs1 = intervalo$.subscribe(observer);
const subs2 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2);
subs1.add(subs3);

//close subscriptions
setTimeout(() => {
    subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();
    console.log('Completado timeout');
}, 7500)



