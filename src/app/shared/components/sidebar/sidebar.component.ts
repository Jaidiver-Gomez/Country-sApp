import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetFiltersService } from '@country/services/reset-filters.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private resetFilters: ResetFiltersService) {
    this.form = new FormGroup({
      filter: new FormControl('name', Validators.required)
    });
  }

  get filter() {
    const { filter } = this.form.controls;
    return filter?.value;
  }

  ngOnInit() {
    this.router.navigate([`/search-country/name`]).then();
    this.form.controls.filter.valueChanges.subscribe((filterChange) => {
      if (filterChange) {
        this.router.navigate([`/search-country/${filterChange}`]).then();
      }
    });

    this.resetFilters.resetFilters$.subscribe((onReset) => {
      if (onReset) {
        //Todo: Se pierde el foco del form y se reinicia al dar click a otro campo, se debe de seleccionar de nuevo el
        // boton para que detecte el cambio de color
        this.form.reset();
      }
    });
  }
}
