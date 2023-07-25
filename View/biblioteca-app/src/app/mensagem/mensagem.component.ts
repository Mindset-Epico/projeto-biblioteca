import { Component } from '@angular/core';

import { MensagemService } from '../services/mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent {

  constructor(public mensagemService: MensagemService) {} // Must be public here. Angular only binds to public component properties.

}
