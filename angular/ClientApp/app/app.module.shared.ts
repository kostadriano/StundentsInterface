import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './components/app/app.component';
import {NavMenuComponent} from './components/navmenu/navmenu.component';
import {HomeComponent} from './components/home/home.component';
import {EstadosComponent} from './components/estados/estados.component';
import {CounterComponent} from './components/counter/counter.component';
import {CidadesComponent} from './components/cidades/cidades.component';
import {CursosComponent} from './components/cursos/cursos.component'
import {ProfessoresComponent} from './components/professores/professores.component'
import {AlunosComponent} from './components/alunos/alunos.component'
import {DisciplinasComponent} from './components/disciplinas/disciplinas.component'
import {TurmasComponent} from './components/turmas/turmas.component'
import {MatriculasComponent} from './components/matriculas/matriculas.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        EstadosComponent,
        HomeComponent,
        CidadesComponent,
        CursosComponent,
        ProfessoresComponent,
        AlunosComponent,
        DisciplinasComponent,
        TurmasComponent,
        MatriculasComponent
    ],
    imports: [
        CommonModule, HttpModule, FormsModule, RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }, {
                path: 'home',
                component: HomeComponent
            },{
                path: 'matriculas',
                component: MatriculasComponent
            },{
                path: 'turmas',
                component: TurmasComponent
            },{
                path: 'alunos',
                component: AlunosComponent
            },{
                path: 'counter',
                component: CounterComponent
            }, {
                path: 'disciplinas',
                component: DisciplinasComponent
            }, {
                path: 'estados',
                component: EstadosComponent
            }, {
                path: 'cidades',
                component: CidadesComponent
            },
            {
                path: 'home',
                redirectTo: 'home'
            },{
                path: 'cursos',
                component: CursosComponent
            },{
                path: 'professores',
                component: ProfessoresComponent
            }
        ])
    ]
})
export class AppModuleShared {}