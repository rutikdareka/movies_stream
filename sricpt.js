window.addEventListener("load", function () {
  // Example usage
  moviesfetch("popular"); // Fetch the first 20 pages for popular movies

  var splashScreen = document.getElementById("splashScreen");
  var mainContent = document.getElementById("mainContent");

  // 3-second delay to let the splash animation complete
  setTimeout(function () {
    splashScreen.style.display = "none";
    mainContent.style.display = "flex";
  }, 3000);
});

let element = document.getElementById("filters");

element.value = "Popular";
let old_value = element.value;

element.addEventListener("change", (e) => {
  const finalvalue = element.value ? element.value : old_value;

  switch (finalvalue) {
    case "Top Rated":
      moviesfetch("top_rated");
      break;
    case "Popular":
      moviesfetch("popular");
      break;
    case "Upcomming":
      moviesfetch("upcoming");
      break;
    default:
      break;
  }
});

async function moviesfetch(q) {
  const totalPages = 20; // Total number of pages to fetch
  const movieResults = []; // Array to store all movie data
  const appendEle = document.getElementById("wrapped_main");

  // Clear existing content and remove the loading message/spinner
  appendEle.innerHTML = "";

  // Show loading message/spinner
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerText = "Loading...";
  appendEle.appendChild(loadingDiv);

  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${q}?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjQyMGFlYTE1YjYyZDFhZjllYTc0OWQ5NWZhYmFkMyIsInN1YiI6IjY1NzE3ZTU0OTBmY2EzMDE0ZTcxYjFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DY3qGumteCUGUB_jcJNzt0obDH0jaPHkN5AtcIjHLfw",
          },
        }
      );

      const data = await response.json();
      // Merge the results with the ex  isting movie results
      movieResults.push(...data.results);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }

  // Clear existing content and remove the loading message/spinner
  appendEle.innerHTML = "";

  // Append the fetched movie results to the DOM
  movieResults.forEach((item) => {
    const divEle = document.createElement("div");
    const imgEle = document.createElement("img");
    const btnEle = document.createElement("button");

    imgEle.src = `https://image.tmdb.org/t/p/w300/${item.poster_path}`;
    btnEle.innerText = "Watch Now";

    btnEle.addEventListener("click", (e) => {
      localStorage.setItem("id", item.id);
      window.location.replace(`/moviestream.html`);
    });

    divEle.classList.add("grids");
    divEle.appendChild(imgEle);
    if (q !== "upcoming") divEle.appendChild(btnEle);
    appendEle.appendChild(divEle);
  });
}

document.getElementById("search_movies").addEventListener("keyup", (e) => {
  let input = e.target.value.trim(); // Trim whitespace from input

  if (input !== "") {
    searchmovies(input);
  } else {
    moviesfetch("popular");
  }
});

async function searchmovies(q) {

  const appendEle = document.getElementById("wrapped_main");

  // Clear existing content and remove the loading message/spinner
  appendEle.innerHTML = "";

  // Show loading message/spinner
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerText = "Loading...";
  appendEle.appendChild(loadingDiv);

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjQyMGFlYTE1YjYyZDFhZjllYTc0OWQ5NWZhYmFkMyIsInN1YiI6IjY1NzE3ZTU0OTBmY2EzMDE0ZTcxYjFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DY3qGumteCUGUB_jcJNzt0obDH0jaPHkN5AtcIjHLfw",
      },
    }
  );

  const data = await response.json();
  const response_data = data.results;

  appendEle.innerHTML = "";


  response_data.forEach((item) => {
    const divEle = document.createElement("div");
    const imgEle = document.createElement("img");
    const btnEle = document.createElement("button");

    imgEle.src = `https://image.tmdb.org/t/p/w300/${item.poster_path}`;
    btnEle.innerText = "Watch Now";

    btnEle.addEventListener("click", (e) => {
      localStorage.setItem("id", item.id);
      window.location.replace(`/moviestream.html`);
    });

    divEle.classList.add("grids");
    divEle.appendChild(imgEle);
    divEle.appendChild(btnEle);
    appendEle.appendChild(divEle);
  });
}

