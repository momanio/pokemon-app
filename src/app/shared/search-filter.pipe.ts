import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return filterText
      ? list.filter((item) => item.name.search(filterText) > -1)
      : list;
  }
}
