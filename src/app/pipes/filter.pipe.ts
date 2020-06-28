import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterValue: string, propertyName?: any) {
    if ((value && value.length === 0) || !filterValue) { return value; }
    const resultArray = [];

    for (const item of value) {
      // case if value array has key:value pairs
      if (typeof propertyName === 'string') {
        if (this.filterItem(item[propertyName], filterValue)) {
          resultArray.push(item);
        }
      } else if (typeof propertyName === 'object') {
        propertyName.forEach(p => {
          if (this.filterItem(item[p].toString(), filterValue)) {
            if (resultArray.indexOf(item) === -1) {
              resultArray.push(item);
            }
          }
        });
      } else {
        if (this.filterItem(item, filterValue)) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }

  filterItem(item: any, filterValue: string) {
    return item.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
  }
}
