import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'cursos', templateUrl: './cursos.component.html'})export class CursosComponent {
    
    public forecasts : Curso[];

    public novoCursoNome: string;

    public novoTitulo: string;

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {

        http
            .get(baseUrl + 'api/Curso')
            .subscribe(result => {
                this.forecasts = result.json()as Curso[];
            }, error => console.error(error));
        }

    public incluir() {     
        var novoCursoSend = {nome:this.novoCursoNome,titulo:this.novoTitulo}

        this.http
        .post(this.baseUrl + 'api/Curso',novoCursoSend).subscribe(result => 
            { this.forecasts.push(result.json())});
    }

    public remover(curso:Curso){
        this.http.delete(`${this.baseUrl}api/curso/${curso.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(curso);
                this.forecasts.splice(index,1);  
            }
        });
    }

}

interface Curso {
    id : number,
    nome : string,
    titulo: string;
}
