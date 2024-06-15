import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  buscaForm = new FormGroup({
    busca: new FormControl('', Validators.required),
  });

  buscarTermo() {
    console.warn(this.buscaForm.value);
  }
}
