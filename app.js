const baseUrl = "https://www.anapioficeandfire.com/api/books";
const booksPerPage = 50;
let currentPage = 1;
let totalBooks;

const booksEl = document.getElementById("books");
const paginationEl = document.getElementById("pagination");

async function getBooks() {
  const startIndex = (currentPage - 1) * booksPerPage;
  const url = `${baseUrl}?pageSize=${booksPerPage}&page=${currentPage}`;
  const response = await fetch(url);
  const books = await response.json();
  totalBooks = response.headers.get("X-Total-Count");
  displayBooks(books, startIndex);
  displayPagination();
}

function displayBooks(books, startIndex) {
  booksEl.innerHTML = "";
  books.forEach((book, index) => {
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.innerHTML = `
      <h2>${startIndex + index + 1}. ${book.name}</h2>
      <p>by ${book.authors.join(", ")}</p>
      <p>published by ${book.publisher}</p>
    `;
    booksEl.appendChild(bookEl);
  });
}

function displayPagination() {
  paginationEl.innerHTML = "";
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("div");
    pageLink.classList.add("page-link");
    pageLink.innerText = i;
    if (i === currentPage) {
      pageLink.classList.add("active");
    } else {
      pageLink.addEventListener("click", () => {
        currentPage = i;
        getBooks();
      });
    }
    paginationEl.appendChild(pageLink);
  }
}

getBooks();
