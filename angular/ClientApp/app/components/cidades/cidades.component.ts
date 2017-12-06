import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'cidades', templateUrl: './cidades.component.html'})export class CidadesComponent {
    
    public forecasts : Cidade[];

    public estadoSelecionado:number;
    
    public novoCidade: string;

    public estados: Estado[];

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        
        http
        .get(baseUrl + 'api/Estado')
        .subscribe(result => {
            this.estados = result.json() as Estado[];
        }, error => console.error(error));

        http
            .get(baseUrl + 'api/Cidade')
            .subscribe(result => {
                this.forecasts = result.json()as Cidade[];
            }, error => console.error(error));
        }

        //Json.stringfy()

    public incluir() {
        if(this.estadoSelecionado == null || this.novoCidade == null){
            alert("Insira todos os dados");
        }
        else{
            var novoCidadeSend = {nome:this.novoCidade,estadoId:this.estadoSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Cidade',novoCidadeSend).subscribe(result => 
                {this.forecasts.push(result.json())});
        }    
    }

    public setEstado(estado:number){
        this.estadoSelecionado = estado;
    }

    public remover(cidade:Cidade){
        this.http.delete(`${this.baseUrl}api/cidade/${cidade.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(cidade);
                this.forecasts.splice(index,1);  
            }
        });
    }

   

}

interface Cidade {
    id : number;
    nome : string;
    estado: Estado;
    estadoId:number;
}

interface Estado {
    id : number;
    nome : string;
}
