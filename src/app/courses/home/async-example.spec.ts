import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

describe('Async Testing Examples', () => {
  it('Async test example with done()', (done: DoneFn) => {

    let test = false;

    setTimeout(() => {

      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();

    }, 1000);

  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {
    });

    setTimeout(() => {
      console.log('running assertions setTimeout()');
      test = true;
    }, 1000);
    // 1. tick() czas który przekazujemy w argumencie
    // po którym zakończy się wywołanie asynchroniczne
    // tick(1000);
    // 2. flush() określa koniec wywołań asynchronicznych
    // bez zwracania uwagi na czas, po prostu czeka
    // i następnie przejście do kolejnych fragmentów kodu

    flush();

    // w przypadku fakeAsync expext() możemy wywołać
    // po operacji asynchronicznej czego nie możemy zrobić przy callbacku
    // done()
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;
    console.log('Creating promise');

    Promise.resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully');
        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then() evaluated successfully');
        test = true;
      });

    flushMicrotasks();

    console.log('Running test assertions');
    expect(test).toBeTruthy();
  }));


  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0); // true

    // Czekamy na wykonanie Promise
    flushMicrotasks();
    expect(counter).toBe(10); // true


    flush(1000);
    expect(counter).toBe(11);  // true
  }));


  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    // Utworzenie Observable test$
    // Jeśli nie użyjemy pipe(delay(1000)) nie musimy używać
    // fakeAsync() ponieważ cały kod ma przebieg synchroniczny
    // delay jest odpowiednikiem setTimeout(1000)
    // dlatego musimy stworzyć zone fakeAsync() kod staje się asynchroniczny
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    // tick - zaczekamy aż kod asynchroniczny wykona się (1000 ms)
    tick(1000);
    // flush(1000);

    console.log('Running test assertions');

    expect(test).toBe(true);
  }));


});
