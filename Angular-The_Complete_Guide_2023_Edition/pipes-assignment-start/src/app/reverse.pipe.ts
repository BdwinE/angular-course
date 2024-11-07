import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class reversePipe implements PipeTransform {
  transform(value: string) {
    return this.arrayToString(value.split("").reverse());
  }
  arrayToString(array: Array<string>) {
    let string: string = "";
    for (let char of array) {
      string += char;
    }
    return string;
  }
}
