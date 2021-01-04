import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

xdescribe('CalculatorService', () => {

  let loggerSpy: any, calc: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService, useValue: loggerSpy
        }
        // LoggerService
      ]
    });

    // calc = new CalculatorService(loggerSpy);
    calc = TestBed.get(CalculatorService);
  });

  it('should add two numbers', () => {
    const result = calc.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = calc.subtract(6, 2);
    expect(result).toBe(4, 'test');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});
