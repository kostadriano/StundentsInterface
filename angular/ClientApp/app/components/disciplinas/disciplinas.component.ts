import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'disciplinas', templateUrl: './disciplinas.component.html'})export class DisciplinasComponent {

    public forecasts : Disciplina[];
    public cursoSelecionado : number;
    public novoDisciplina : string;
    public novoCargaHoraria : number;
    public disciplina: any;

    public edit = false;

    public cursos : Curso[];

    constructor(private http : Http, @Inject('BASE_URL')private baseUrl : string) {

        http
            .get(baseUrl + 'api/Curso')
            .subscribe(result => {
                this.cursos = result.json()as Curso[];
            }, error => console.error(error));

        http
            .get(baseUrl + 'api/Disciplina')
            .subscribe(result => {
                this.forecasts = result.json()as Disciplina[];
            }, error => console.error(error));
    }

    //Json.stringfy()

    public incluir() {
        if (this.cursoSelecionado == null || this.novoDisciplina == null || this.novoCargaHoraria ==0)  {
            alert("Insira todos os dados");
        } else if(!this.edit) {
            var novoDisciplinaSend = {
                nome: this.novoDisciplina,
                cargaHoraria:this.novoCargaHoraria,
                cursoId: this.cursoSelecionado
            }

            this.http
            .post(this.baseUrl + 'api/Disciplina', novoDisciplinaSend)
            .subscribe(result => {
            this.forecasts.push(result.json())
             });
            this.novoCargaHoraria = 0;
            this.novoDisciplina = "";
        }
        else{
            this.disciplina.nome=this.novoDisciplina;
            this.disciplina.cargaHoraria = this.novoCargaHoraria;
            this.disciplina.cursoId = this.cursoSelecionado;

            let index = this.forecasts.indexOf(this.disciplina);

            this.http
            .put(this.baseUrl + `api/Disciplina/${this.disciplina.id}`, this.disciplina)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
            this.novoDisciplina = "";
            this.novoCargaHoraria = 0;
            this.edit = false;
        }    
    }

    public setCurso(curso : number) {
        this.cursoSelecionado = curso;
    }

    public remover(disciplina : Disciplina) {
        this
            .http
            .delete(`${this.baseUrl}api/disciplina/${disciplina.id}`)
            .subscribe(result => {
                if (result.status === 204) {
                    let index = this
                        .forecasts
                        .indexOf(disciplina);
                    this
                        .forecasts
                        .splice(index, 1);
                }
            });
    }

    public clear(){
        this.novoDisciplina = "";
        this.novoCargaHoraria = 0;
        this.edit = false;
    }

 
    public editar(disciplina:any){
        this.disciplina = disciplina;
        this.novoCargaHoraria = disciplina.cargaHoraria;
        this.novoDisciplina = disciplina.nome;
        this.edit = true;
    }


}

interface Disciplina {
    id : number;
    nome : string;
    cargaHoraria : number;
    curso : Curso;
    cursoId : number;
}

interface Curso {
    id : number;
    titulo : string;
    nome : string;
}
