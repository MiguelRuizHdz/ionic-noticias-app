import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
})


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

// Inyectamos el cliente del http
  constructor( private http: HttpClient ) { }

  // le decimos con <T> que recibimos tipo
  private ejecutarQuery<T>( query: string ){

    query = apiUrl + query;
    // y la respuesta es de ese tipo <T>
    return this.http.get<T>( query, { headers });
  }

  //Primer metodo para obtener los top-headlines
  getTopHeadlines(){

    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${ this.headlinesPage }`);
    //return del llamado al lugar<tipo de dato del observable></tipo>(`url` entre backticks)
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=05fae9276b5e47369fc7a3535dd00cd3`);
  }

  getTopHeadlinesCategoria( categoria: string ){

    if ( this.categoriaActual === categoria ){
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    // ${ template string }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
  }

}
