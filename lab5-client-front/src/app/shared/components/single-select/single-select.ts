import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-single-select',
  imports: [CommonModule],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SingleSelect,
      multi: true,
    }
  ],
  templateUrl: './single-select.html',
  styleUrl: './single-select.scss',
})
export class SingleSelect {
  options = input<{ label: string; value: any }[]>([]);
  placeholder = input<string>('Selecionar…');

  isOpen = signal<boolean>(false);
  internalValue = signal<any>(null);
  selectedLabel = computed(() => {
    const v = this.internalValue();
    return this.options().find(o => o.value === v)?.label ?? this.placeholder;
  });

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: any): void {
    this.internalValue.set(v);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  toggle() {
    this.isOpen.update(v => !v);
  }

  select(option: any) {
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.isOpen.set(false);
  }
}
