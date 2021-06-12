import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [SidebarComponent];

@NgModule({
  declarations: [SidebarComponent, ...components],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...components]
})
export class SharedModule {}
