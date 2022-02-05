import { Observable, Observer } from "rxjs";

const observer: Observer<any> = {
    next: (res) => console.log(res),
    error: (err: any) => console.warn(err),
    complete: () => console.log('Complete'),
};

// const obs$ = Observable.create();
const obs$ = new Observable<string>(subscriber => {
    
    subscriber.next('Hola');
    subscriber.next('Mundo');
    subscriber.next('Hola Mundo');
    subscriber.next('Hola Lion!');

    //force error
    const a = undefined;
    a.nombre = '1';

    //complete execution
    subscriber.complete();

    //its complete, it d 
    subscriber.next('Hola Lion complete!');
});

// obs$.subscribe(console.log);
// obs$.subscribe(
//     {
//         next: (res) => console.log(res),
//         error: (err: any) => console.warn(err),
//         complete: () => console.log('Complete'),
//     }
// );

obs$.subscribe(
    observer
);


