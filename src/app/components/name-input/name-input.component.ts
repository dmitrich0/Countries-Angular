import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss']
})
export class NameInputComponent implements OnDestroy {
  @Output() setValue: EventEmitter<any> = new EventEmitter();
  private _searchSubject: Subject<any> = new Subject<any>();

  constructor() {
    this._setSearchSubscription();
  }

  public updateSearch(searchValue: string): void {
    this._searchSubject.next(searchValue);
  }

  private _setSearchSubscription(): void {
    this._searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      this.setValue.emit(searchValue);
    });
  }

  ngOnDestroy(): void {
    this._searchSubject.unsubscribe();
  }
}
