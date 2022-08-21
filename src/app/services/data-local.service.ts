import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../pages/interfaces/interfaces';
import { ToastController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController ) {
    this.storage.create();
    this.cargarFavoritos();
  }
  
  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias );
    }

    this.presentToast('Se agregó a favoritos');

  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if ( favoritos ){
      this.noticias = favoritos;
    }
  }

  borrarNoticia( noticia ){
    // la funcion regresa un arreglo sin el elemento
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    // guardamos el arreglo que quedó sin el elemento
    this.storage.set('favoritos', this.noticias );
    this.presentToast('Se borró de favoritos');

  }

}
