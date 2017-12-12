import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'cursos', templateUrl: './cursos.component.html'})export class CursosComponent {
    
    public forecasts : Curso[];

    public curso: any;

    public cursoNome: string;

    public novoTitulo: string;

    public edit = false;

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {

        http
            .get(baseUrl + 'api/Curso')
            .subscribe(result => {
                this.forecasts = result.json()as Curso[];
            }, error => console.error(error));
        }

    public incluir() {     
        
        if(!this.edit){
        var novoCursoSend = {nome:this.cursoNome,titulo:this.novoTitulo}
        this.cursoNome ="";
        this.novoTitulo = "";

        this.http
        .post(this.baseUrl + 'api/Curso',novoCursoSend).subscribe(result => 
            { this.forecasts.push(result.json())});
        }
        else{
            this.curso.nome=this.cursoNome;
            this.curso.titulo= this.novoTitulo;

            let index = this.forecasts.indexOf(this.curso);

            this.http
            .put(this.baseUrl + `api/curso/${this.curso.id}`, this.curso)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
            this.cursoNome = "";
            this.novoTitulo="";
            this.edit = false;
        }    
    }

    public remover(curso:Curso){
        this.http.delete(`${this.baseUrl}api/curso/${curso.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(curso);
                this.forecasts.splice(index,1);  
            }
        });
    }

    public clear(){
        this.cursoNome = "";
        this.novoTitulo = "";
        this.edit = false;
    }

 
    public editar(curso:any){
        this.curso = curso;
        this.novoTitulo = curso.titulo;
        this.cursoNome = curso.nome;
        this.edit = true;
    }

}

interface Curso {
    id : number,
    nome : string,
    titulo: string;
}
