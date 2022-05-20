import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from './interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies!: Movies;
  moviesUrl = "http://localhost:4201/movies-popular";

  constructor(private http: HttpClient) { }
}
