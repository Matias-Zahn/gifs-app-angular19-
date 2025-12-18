import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInput {
  value = output<string>();
  placeHolder = input<string>('Buscar');
  inputValue = signal<string>('');

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanUp(() => {
      clearTimeout(timeout);
    });
  });

  onSearch(value: string): void {
    if (value.length <= 2) return;
    // Mas validaciones para buscar aca!
    this.value.emit(value);
  }
}
