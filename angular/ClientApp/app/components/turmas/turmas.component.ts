import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'
import { empty } from 'rxjs/Observer';
@Component({selector: 'turmas', templateUrl: './turmas.component.html'})export class TurmasComponent {
    
    public forecasts : Turma[];
    public disciplinas: any[];
    public professores: any[];
    public turma:any;

    public professorSelecionado:number;
    public disciplinaSelecionado:number;
    
    public edit = false;

    public novoDia: number;
    public novoSala: string;
    public novoVagas: number;
 

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        
        http
        .get(baseUrl + 'api/Professor')
        .subscribe(result => {
            this.professores = result.json() as any[];
        }, error => console.error(error));

        http
        .get(baseUrl + 'api/Disciplina')
        .subscribe(result => {
            this.disciplinas = result.json() as any[];
        }, error => console.error(error));

        http
            .get(baseUrl + 'api/Turma')
            .subscribe(result => {
                this.forecasts = result.json()as Turma[];
            }, error => console.error(error));
        }

        //Json.stringfy()

    public incluir() {
        if(!this.edit){    
            var novoTurmaSend = {sala:this.novoSala,dia:this.novoDia,vagas:this.novoVagas,
                professorId:this.professorSelecionado, disciplinaId:this.disciplinaSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Turma',novoTurmaSend).subscribe(result => 
                {this.forecasts.push(result.json())});
            
            this.clear();
        }
        else{
            this.turma.sala = this.novoSala;
            this.turma.dia = this.novoDia;
            this.turma.vagas = this.novoVagas;
            this.turma.professorId = this.professorSelecionado;
            this.turma.disciplinaId = this.disciplinaSelecionado;

            let index = this.forecasts.indexOf(this.turma);

            this.http
            .put(this.baseUrl + `api/turma/${this.turma.id}`, this.turma)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
            this.clear();
        }            
    }

    public setProfessor(professor:number){
        this.professorSelecionado = professor;
    }

    public setDisciplina(disciplina:number){
        this.disciplinaSelecionado = disciplina;
    }


    public remover(turma:Turma){
        this.http.delete(`${this.baseUrl}api/turma/${turma.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(turma);
                this.forecasts.splice(index,1);  
            }
        });
    };
    
    public clear(){
        this.novoDia = 0;
        this.novoSala = "";
        this.novoVagas = 0;
        this.edit = false;
    }

 
    public editar(turma:any){
        this.turma = turma;
        this.novoDia = turma.dia;
        this.novoSala = turma.sala;
        this.novoVagas = turma.vagas;
        this.edit = true;
    }

}



interface Turma {
    id : number;
    dia : number;
    sala:string;
    vagas:number;
    professor:any;
    professorId:number;
    turma: any;
    cidadeId:number;
}
