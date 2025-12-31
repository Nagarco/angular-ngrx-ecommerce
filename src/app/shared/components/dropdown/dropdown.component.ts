import { SelectOption } from '@/shared/interfaces';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, MatSelectModule, TranslateModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent<T> {
  label = input<string>('');
  options = input<SelectOption<T>[]>([]);
  selectionChange = output<T>();

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event.value);
  }
}
