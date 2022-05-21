import { Component, OnInit } from '@angular/core';
import { MoviesService, TotMovie } from 'src/app/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private srvMovies: MoviesService) { }

  movies!: TotMovie[];

  async ngOnInit() {
    this.movies = await this.srvMovies.getMoviesPop();
  }

  //aggiungi e rimuovi fav
  //se id del movie ? allora rimuovi movie fav : oppure aggiungi movie fav
  async addFavMovies(idMovie: number, index: number) {
    this.movies[index].favIsLoading = true;
    try {
      const myFavorite = await (await this.srvMovies.addFav(idMovie)).toPromise(); //promise
      // modifica array con favorito
      this.movies[index] = { ...this.movies[index], favId: myFavorite!.id }
    } catch {
      this.movies[index].favIsLoading = false;
      console.log("Non è possibile aggiungere il favorito"); // controlla
    };
  }; //c'è un bug nell'aggiunta dei favorites: alle volte rimane disabilitato (vedi html)

  async removeFavMovie(idMovie: number, index: number) {
    this.movies[index].favIsLoading = true;
    try {
      await this.srvMovies.removeFav(idMovie).toPromise();
      this.movies[index].favIsLoading = false;
      this.movies[index] = { ...this.movies[index], favId: undefined }
    } catch {
      this.movies[index].favIsLoading = false;
      console.log("Non è possibile togliere il favorito");
    };
  };

}
