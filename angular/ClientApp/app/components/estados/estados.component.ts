import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'estados', templateUrl: './estados.component.html'})export class EstadosComponent {
    
    public forecasts : Estado[];
    public novoEstado: string;

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        http
            .get(baseUrl + 'api/Estado')
            .subscribe(result => {
                this.forecasts = result.json() as Estado[];
            }, error => console.error(error));
        }

    public incluir() {     
        var novoEstadoSend = {nome:this.novoEstado}
        this.http
        .post(this.baseUrl + 'api/Estado',novoEstadoSend).subscribe(result => 
            { this.forecasts.push(result.json())});
    }

    public remover(estado:Estado){
        this.http.delete(`${this.baseUrl}api/estado/${estado.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(estado);
                this.forecasts.splice(index,1);  
            }
        });
    }

}

interface Estado {
    id : number,
    nome : string
}
