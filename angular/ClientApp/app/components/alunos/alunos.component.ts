import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'alunos', templateUrl: './alunos.component.html'})export class AlunosComponent {
    
    public forecasts : Aluno[];

    public cidadeSelecionado:number;
    
    public novoAluno: string;
    public novoTelefone: string;
    public novoEmail: string;
    public novoEndereco: string;
    
    
    public cidades: Cidade[];

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        
        http
        .get(baseUrl + 'api/Cidade')
        .subscribe(result => {
            this.cidades = result.json() as Cidade[];
        }, error => console.error(error));

        http
            .get(baseUrl + 'api/Aluno')
            .subscribe(result => {
                this.forecasts = result.json()as Aluno[];
            }, error => console.error(error));
        }

        //Json.stringfy()

    public incluir() {
        if(this.cidadeSelecionado == null || this.novoAluno == null){
            alert("Insira todos os dados");
        }
        else{
            var novoAlunoSend = {nome:this.novoAluno,endereco:this.novoEndereco,email:this.novoEmail,
                telefone:this.novoTelefone,cidadeId:this.cidadeSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Aluno',novoAlunoSend).subscribe(result => 
                {this.forecasts.push(result.json())});
        }    
    }

    public setCidade(cidade:number){
        this.cidadeSelecionado = cidade;
    }

    public remover(aluno:Aluno){
        this.http.delete(`${this.baseUrl}api/aluno/${aluno.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(aluno);
                this.forecasts.splice(index,1);  
            }
        });
    }

   

}

interface Aluno {
    id : number;
    nome : string;
    endereco:string;
    email:string;
    telefone:string;
    cidade: Cidade;
    cidadeId:number;
}

interface Cidade {
    id : number;
    nome : string;
}
