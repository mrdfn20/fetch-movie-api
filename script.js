// tech : ajax with jquery library

// event on click search button
$(".btn-search").on("click", function () {
  $.ajax({
    // get api 1
    url:
      "http://www.omdbapi.com/?apikey=3cfa3b78&s=" + $(".input-keyword").val(),
    success: (result) => {
      // remove key search
      const movies = result.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showMovies(m);
      });

      $(".movie-container").html(cards);

      // get api 2

      // on show details clicked
      // event listener jgn pake arrow function, karna
      // tidak memiliki konsep this, gunakan yg biasa
      $(".modal-detail-btn").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=3cfa3b78&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetails = showMovieDetail(m);

            $(".modal-body").html(movieDetails);
          },
          error: (e) => console.log(e.responseText),
        });
      });
    },
    error: (e) => console.log(e.responseText),
  });
});

function showMovies(m) {
  return `<div class="col-md-4 my-3">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-year mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal"
        data-bs-target="#movieDetailsModal" data-imdbid="${m.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
  return `

    <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid" />
          </div>
          <div class="col-md">
            <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title}</h4></li>
              <li class="list-group-item">
                <strong>Director :</strong>${m.Title}
              </li>
              <li class="list-group-item">
                <strong>Actors :</strong>${m.Actors}
              </li>
              <li class="list-group-item">
                <strong>Writer : </strong>${m.Writer}
              </li>
              <li class="list-group-item">
                <strong>Plot : </strong><br />${m.Plot}
              </li>
              <li class="list-group-item">
                <strong>Rating : </strong><br>${ratings}
              </li>
            </ul>
          </div>
        </div>
      </div>`;
}
