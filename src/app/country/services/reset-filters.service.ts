import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetFiltersService {
  private resetFilters = new BehaviorSubject<boolean>(false);

  get resetFilters$(): Observable<boolean> {
    return this.resetFilters.asObservable();
  }

  onResetFilters() {
    this.resetFilters.next(true);
  }
}
