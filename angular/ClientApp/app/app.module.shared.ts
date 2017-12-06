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

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        EstadosComponent,
        HomeComponent,
        CidadesComponent,
        CursosComponent,
        ProfessoresComponent
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
            }, {
                path: 'counter',
                component: CounterComponent
            }, {
                path: 'estados',
                component: EstadosComponent
            }, 
            {
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