import Array "mo:base/Array";

actor MovieList {

  type Movie = {
    id : Nat;
    title : Text;
    urlImage : Text;
    description : Text;
    rating : Nat;
  };

  var movies : [Movie] = [{
    id = 1;
    title = "Los juegos del hambre";
    //resolucion recomendada 1200x1800
    urlImage = "https://es.web.img2.acsta.net/pictures/210/455/21045552_20131001101323189.jpg";
    description = "Juegos sangrientos entre diferentes distritos";
    rating = 4;
  }];

  public func addMovie(
    rating : Nat,
    title : Text,
    url_image : Text,
    description : Text,
  ) : async Bool {
    let newId = Array.size(movies) + 1; 
    let newMovie = {
      id = newId;
      title = title;
      urlImage = url_image;
      description = description;
      rating = rating;
    };
    movies := Array.append<Movie>(movies, [newMovie]);
    return true;
  };

  public func getAllMovies() : async [Movie] {
    return movies;
  };

  public func getMovieById(id : Nat) : async ?Movie {
    return Array.find<Movie>(movies, func(m) { m.id == id });
  };

  public func updateMovie(
    id : Nat,
    title : Text,
    urlImage : Text,
    description : Text,
    rating : Nat,
  ) : async Bool {
    let movieToUpdate = Array.find<Movie>(movies, func(movie) { movie.id == id });

    switch (movieToUpdate) {
      case (null) { return false };
      case (?movieToUpdate) {
        let updatedMovie = {
          id = id;
          title = title;
          urlImage = urlImage;
          description = description;
          rating = rating;
        };
        movies := Array.map<Movie, Movie>(movies, func(m) { if (m.id == id) { updatedMovie } else { m } });
        return true;
      };
    };
  };

  public func deleteMovie(id : Nat) : async Bool {
    let movie = Array.find<Movie>(movies, func(movie) { movie.id == id });
    if (movie != null) {
      movies := Array.filter<Movie>(movies, func(movie) { movie.id != id });
      return true;
    } else {
      return false;
    };
  };
};
