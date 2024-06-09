import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.scss',
  imports: [ReactiveFormsModule, MatInputModule, MatDivider, MatButton],
  standalone: true,
})
export class EdicaoComponent {
  profileForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    subtitulo: new FormControl(''),
    texto: new FormControl('', Validators.required),
  });

  salvarEdicao() {
    console.warn(this.profileForm.value);
  }
}
