import { Pipe } from "@angular/core";

@Pipe({
  name: "sort",
  pure: false,
})
export class SortPipe {
  transform(value: Array<any>) {
    console.log("value");
    console.log(value);
    return value.sort((a: { name: string }, b: { name: string }): number => {
      return a.name.localeCompare(b.name);
    });
  }
}
