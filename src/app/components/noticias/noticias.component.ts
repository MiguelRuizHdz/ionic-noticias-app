import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../pages/interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  // Para recibir el dato
  @Input() noticias: Article[] = []
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
