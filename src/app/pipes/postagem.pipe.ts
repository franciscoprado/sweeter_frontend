import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postagem',
  standalone: true,
})
export class PostagemPipe implements PipeTransform {
  transform(value: string = '', ...args: unknown[]): unknown {
    let texto = value.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
    return texto;
  }
}
