import {Component, Inject, Input} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'estados', templateUrl: './estados.component.html'})export class EstadosComponent {
    public forecasts : Estado[];
    public estadoNome : string;
    public estado: any;
    public edit = false;

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {
        http
            .get(baseUrl + 'api/Estado')
            .subscribe(result => {
                this.forecasts = result.json()as Estado[];
            }, error => console.error(error));
    }

    public incluir() {
        if(this.edit == false){
            var value = {nome: this.estadoNome}
            this.estadoNome = "";
            
            this.http
            .post(this.baseUrl + 'api/Estado', value)
            .subscribe(result => {
            this.forecasts.push(result.json())
            });
        }
        else{
            this.estado.nome=this.estadoNome;
            
            let index = this.forecasts.indexOf(this.estado);

            this.http
            .put(this.baseUrl + `api/Estado/${this.estado.id}`, this.estado)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
            this.estadoNome = "";
        }

    }

    public clear(){
        this.estadoNome = "";
        this.edit = false;
    }

    public editar(estado:Estado){
        this.estado = estado;
        this.estadoNome = estado.nome;
        this.edit = true;
    }

    public remover(estado : Estado) {
        this
            .http
            .delete(`${this.baseUrl}api/estado/${estado.id}`)
            .subscribe(result => {
                if (result.status === 204) {
                    let index = this
                        .forecasts
                        .indexOf(estado);
                    this
                        .forecasts
                        .splice(index, 1);
                }
            });
    }

}

interface Estado {
    id : number,
    nome : string
}
