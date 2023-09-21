import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenate',
})
export class ConcatenatePipe implements PipeTransform {
  transform(value: string[], separator: string = ' '): string {
    return value.join(separator);
  }
}
