import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'cidades', templateUrl: './cidades.component.html'})export class CidadesComponent {
    
    public forecasts : any[];
    public estadoSelecionado:number; 
    public cidadeNome: string;
    public edit = false;
    public cidade:any;
    public estados: any[];

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        
        http
        .get(baseUrl + 'api/Estado')
        .subscribe(result => {
            this.estados = result.json() as any[];
        }, error => console.error(error));

        http
            .get(baseUrl + 'api/Cidade')
            .subscribe(result => {
                this.forecasts = result.json()as any[];
            }, error => console.error(error));
        }

        //Json.stringfy()

    public incluir() {
        if(this.estadoSelecionado == null || this.cidadeNome == null){
            alert("Insira todos os dados");
        }
        else if(this.edit == false){
            var cidadeNomeSend = {nome:this.cidadeNome,estadoId:this.estadoSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Cidade',cidadeNomeSend).subscribe(result => 
                {this.forecasts.push(result.json())});
        }
        else{

            let indexEstado;
            for(let estado of this.estados){
                if(estado.id == this.estadoSelecionado){
                    indexEstado = estado.id;
                }
            }

            this.cidade.nome=this.cidadeNome;
            this.cidade.estado = this.estados[indexEstado];
            this.cidade.estadoId = this.estadoSelecionado;

            let index = this.forecasts.indexOf(this.cidade);

            this.http
            .put(this.baseUrl + `api/Cidade/${this.cidade.id}`, this.cidade)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
        }    
    }

    public clear(){
        this.cidadeNome = "";
        this.edit = false;
    }

 
    public editar(cidade:any){
        this.cidade = cidade;
        this.cidadeNome = cidade.nome;
        this.edit = true;
    }

    public setEstado(estado:number){
        this.estadoSelecionado = estado;
    }

    public remover(cidade:any){
        this.http.delete(`${this.baseUrl}api/cidade/${cidade.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(cidade);
                this.forecasts.splice(index,1);  
            }
        });
    }

   

}
