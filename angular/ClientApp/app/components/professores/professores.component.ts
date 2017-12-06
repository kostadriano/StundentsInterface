import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {NgModel} from '@angular/forms'

@Component({selector: 'professores', templateUrl: './professores.component.html'})export class ProfessoresComponent {
    
    public forecasts : Professor[];
    public novoProfessor: string;

    constructor(private http : Http, @Inject('BASE_URL') private baseUrl : string) {
        http
            .get(baseUrl + 'api/Professor')
            .subscribe(result => {
                this.forecasts = result.json() as Professor[];
            }, error => console.error(error));
        }

    public incluir() {     
        var novoProfessorSend = {nome:this.novoProfessor}
        this.http
        .post(this.baseUrl + 'api/Professor',novoProfessorSend).subscribe(result => 
            { this.forecasts.push(result.json())});
    }

    public remover(professor:Professor){
        this.http.delete(`${this.baseUrl}api/professor/${professor.id}`).subscribe(result => {
            if(result.status === 204){
                let index = this.forecasts.indexOf(professor);
                this.forecasts.splice(index,1);  
            }
        });
    }

}

interface Professor {
    id : number,
    nome : string
}
