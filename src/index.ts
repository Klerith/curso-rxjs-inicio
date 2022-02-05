import { Observable, Observer } from "rxjs";

const observer: Observer<any> = {
    next: (res) => console.log(res),
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

    //Return apply when call unsubscribe
    return () => {
        clearInterval(intervalo);
        console.log('The interval has been destroy');
    }
});

//Init subscriptions
const subs1 = intervalo$.subscribe(num => {
    console.log('Num', num);
});
const subs2 = intervalo$.subscribe(num => {
    console.log('Num', num);
});
const subs3 = intervalo$.subscribe(num => {
    console.log('Num', num);
});

//close subscriptions
setTimeout(() => {
    subs1.unsubscribe();
    subs2.unsubscribe();
    subs3.unsubscribe();
    console.log('Completado timeout');
}, 7500)



