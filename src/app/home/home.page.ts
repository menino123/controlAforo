import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public items: any;
  constructor(private modalCtrl: ModalController, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.informacion();
    /*if(localStorage.getItem('informacion1') === null){
      this.informacion();
    }
    else{
      document.getElementById("info1").innerHTML = localStorage.getItem('informacion1');
      document.getElementById("info2").innerHTML = localStorage.getItem('informacion2');
      document.getElementById("info3").innerHTML = localStorage.getItem('informacion3');

    }*/
  }

  abrir(url:string){
    window.open(url,'_system','location=yes');
  }

  async informacion(){
    const loading = await this.loadingController.create({
      message: 'Cargando Informaciones...'
    });

    await loading.present();

    this.http.get(environment.apiConsulta).subscribe(async (res:any) =>{

      this.items = res;

      localStorage.setItem('informacion1',res[0]['informacion1']);
      localStorage.setItem('informacion2',res[0]['informacion2']);
      localStorage.setItem('informacion3',res[0]['informacion3']);

      await loading.dismiss();
    }, async err => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: err.message,
        buttons: ['ok']
      });

      await alert.present();
    });
  }

}
