import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environment/environment'
@Injectable({ providedIn: 'root' })
export class PokemonService {
    private apiUrl: string = environment.pokeAPI ;

    constructor(private http: HttpClient){}

}