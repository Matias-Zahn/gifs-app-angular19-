import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInput { 

  value = output<string>();
  placeHolder = input<string>('Buscar');


    onSearch(value:string): void {
      if(value.length <= 2) return
      // Mas validaciones para buscar aca! 
      this.value.emit(value)
  }

}
