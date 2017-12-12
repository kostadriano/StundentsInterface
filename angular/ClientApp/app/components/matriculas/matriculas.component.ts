import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'matriculas', templateUrl: './matriculas.component.html'})export class MatriculasComponent {
    
    public forecasts : any[];
    public alunos:any[];
    public alunoSelecionado:number;
    public turmaSelecionado:number;    
    public turmas: any[];

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        
        http
        .get(baseUrl + 'api/Turma')
        .subscribe(result => {
            this.turmas = result.json() as any[];
        }, error => console.error(error));

        http
        .get(baseUrl + 'api/Aluno')
        .subscribe(result => {
            this.alunos = result.json() as any[];
        }, error => console.error(error));


        http
            .get(baseUrl + 'api/Matricula')
            .subscribe(result => {
                this.forecasts = result.json()as any[];
            }, error => console.error(error));
        }

        //Json.stringfy()

    public incluir() {
        var now = new Date();
            var novoMatriculaSend = {turmaId:this.turmaSelecionado,alunoId:this.alunoSelecionado}
            
            this.http
            .post(this.baseUrl + 'api/Matricula',novoMatriculaSend).subscribe(result => 
                {this.forecasts.push(result.json())});  
    }

    public setTurma(turma:number){
        this.turmaSelecionado = turma;
    }    
    
    public setAluno(aluno:number){
        this.alunoSelecionado = aluno;
    }

    public remover(matricula:any){
        this.http.delete(`${this.baseUrl}api/matricula/${matricula.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(matricula);
                this.forecasts.splice(index,1);  
            }
        });
    }

   

}
