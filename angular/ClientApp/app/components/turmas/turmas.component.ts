import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'
@Component({selector: 'turmas', templateUrl: './turmas.component.html'})export class TurmasComponent {
    
    public forecasts : Turma[];
    public disciplinas: any[];
    public professores: any[];

    public professorSelecionado:number;
    public disciplinaSelecionado:number;
    
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
            var novoTurmaSend = {sala:this.novoSala,dia:this.novoDia,vagas:this.novoVagas,
                professorId:this.professorSelecionado, disciplinaId:this.disciplinaSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Turma',novoTurmaSend).subscribe(result => 
                {this.forecasts.push(result.json())});
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
}

interface Turma {
    id : number;
    dia : number;
    sala:string;
    vagas:number;
    professor:any;
    professorId:number;
    cidade: any;
    cidadeId:number;
}
