import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, //allows this pipe to execute whenever the pipe parent changes
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string) {
    console.log('pipe ran');
    if (filterString === '') return value;
    const resultArray = [];
    if (value.length === 0) return value;
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
