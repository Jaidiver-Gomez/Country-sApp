import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.css']
})
export class CountryInputComponent implements OnInit, OnChanges, OnDestroy {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';
  @Input() resetInput: boolean = false;

  debounce: Subject<string> = new Subject();
  term: string = '';
  private destroy$ = new Subject<any>();

  onEnter() {
    this.onSearch.emit(this.term);
  }

  keyPress() {
    this.debounce.next(this.term);
  }

  ngOnInit() {
    this.debounce
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        filter((search) => {
          const onSearch = search !== '' && search?.length > 2;
          //TODO: term is not set to null
          this.term = search;
          return onSearch;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((valor) => this.onDebounce.emit(valor));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetInput?.currentValue) {
      this.term = '';
    }
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
