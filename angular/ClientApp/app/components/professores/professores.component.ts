import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'professores', templateUrl: './professores.component.html'})export class ProfessoresComponent {
    
    public forecasts : Professor[];
    public novoProfessor: string;
    public edit = false;
    public professor: any;

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        http
            .get(baseUrl + 'api/Professor')
            .subscribe(result => {
                this.forecasts = result.json() as Professor[];
            }, error => console.error(error));
        }

    public incluir() {
        if(!this.edit){     
            var novoProfessorSend = {nome:this.novoProfessor}
            this.novoProfessor = "";
    
            this.http
            .post(this.baseUrl + 'api/Professor',novoProfessorSend).subscribe(result => 
                { this.forecasts.push(result.json())});
        }
        else{
            this.professor.nome=this.novoProfessor;
            
            let index = this.forecasts.indexOf(this.professor);

            this.http
            .put(this.baseUrl + `api/Professor/${this.professor.id}`, this.professor)
            .subscribe(result => {
            this.forecasts[index] = result.json();
            })
            this.novoProfessor = "";
        }
    }
    public remover(professor:Professor){
        this.http.delete(`${this.baseUrl}api/professor/${professor.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(professor);
                this.forecasts.splice(index,1);  
            }
        });
    }

    public clear(){
        this.novoProfessor = "";
        this.edit = false;
    }

    public editar(professor:Professor){
        this.professor = professor;
        this.novoProfessor = professor.nome;
        this.edit = true;
    }


}

interface Professor {
    id : number,
    nome : string
}
