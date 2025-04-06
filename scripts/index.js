class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  #id = self.crypto.randomUUID();

  get getID() {
    return this.#id;
  }

  set setIsRead(isRead) {
    this.isRead = isRead;
  }
}

const myLibrary = [];

const addBookToMyLibrary = (title, author, pages, isRead) => {
  myLibrary.push(new Book(title, author, pages, isRead));
};

const refDOM = {
  main: document.querySelector("#main"),
  addBook: document.querySelector("#add"),
  deleteBook: null,
  readOnCard: null,
  formContainer: document.querySelector("#form-container"),
  closeFormButton: document.querySelector("#close-form-button"),
  titleInput: document.querySelector("#title-input"),
  authorInput: document.querySelector("#author-input"),
  pagesInput: document.querySelector("#pages-input"),
  yesRadio: document.querySelector("#yes-radio"),
  noRadio: document.querySelector("#no-radio"),
};

refDOM.addBook.addEventListener(
  "click",
  () => (refDOM.formContainer.style.display = "flex")
);

const resetInputs = () => {
  refDOM.titleInput.style.border = "none";
  refDOM.titleInput.style.backgroundColor = "#fff";
  refDOM.titleInput.value = "";
  refDOM.authorInput.style.border = "none";
  refDOM.authorInput.style.backgroundColor = "#fff";
  refDOM.authorInput.value = "";
  refDOM.pagesInput.style.border = "none";
  refDOM.pagesInput.style.backgroundColor = "#fff";
  refDOM.pagesInput.value = "";
  refDOM.noRadio.checked = true;
};

const validateForm = () => {
  if (refDOM.titleInput.value === "") {
    refDOM.titleInput.style.border = "2px solid red";
    refDOM.titleInput.style.backgroundColor = "hsl(0, 100%, 80%)";
  }

  if (refDOM.authorInput.value === "") {
    refDOM.authorInput.style.border = "2px solid red";
    refDOM.authorInput.style.backgroundColor = "hsl(0, 100%, 80%)";
  }

  if (refDOM.pagesInput.value === "") {
    refDOM.pagesInput.style.border = "2px solid red";
    refDOM.pagesInput.style.backgroundColor = "hsl(0, 100%, 80%)";
  }
};

const removeAllCards = () => {
  while (refDOM.main.firstChild) {
    refDOM.main.removeChild(refDOM.main.firstChild);
  }
};

const addCardsToUI = (obj) => {
  const card = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("h2");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  const imgDiv = document.createElement("div");
  const image = document.createElement("img");

  card.className = "card";
  card.id = obj.getID;
  title.textContent = obj.title;
  author.textContent = obj.author;
  pages.textContent = `${obj.pages} pages`;
  read.textContent = obj.isRead;
  read.className = "read";
  imgDiv.className = "delete";
  image.src = "./icons/trash.svg";
  image.alt = "trash_icon";
  image.width = "32";

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  imgDiv.appendChild(image);
  card.appendChild(imgDiv);
  refDOM.main.appendChild(card);
};

const addTheAddButtonToUI = () => {
  const div = document.createElement("div");
  const image = document.createElement("img");

  div.id = "add";
  image.src = "./icons/plus.svg";
  image.alt = "plus_icon";
  image.width = "150";

  div.appendChild(image);
  refDOM.main.appendChild(div);
};

const handleForm = () => {
  const isTheBookRead = refDOM.yesRadio.checked ? "read" : "not read";

  addBookToMyLibrary(
    refDOM.titleInput.value,
    refDOM.authorInput.value,
    refDOM.pagesInput.value,
    isTheBookRead
  );

  removeAllCards();
  myLibrary.forEach(addCardsToUI);
  addTheAddButtonToUI();

  refDOM.addBook = document.querySelector("#add");
  refDOM.addBook.addEventListener(
    "click",
    () => (refDOM.formContainer.style.display = "flex")
  );

  refDOM.deleteBook = document.querySelectorAll(".delete");
  refDOM.readOnCard = document.querySelectorAll(".read");

  for (let i = 0; i < myLibrary.length; i++) {
    refDOM.deleteBook[i].addEventListener("click", (e) => {
      const card =
        e.target.tagName === "IMG"
          ? e.target.parentElement.parentElement
          : e.target.parentElement;

      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].getID === card.id) {
          myLibrary.splice(i, 1);
        }
      }

      card.remove();
    });

    refDOM.readOnCard[i].addEventListener("click", (e) => {
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].getID === e.target.parentElement.id) {
          myLibrary[i].setIsRead =
            e.target.textContent === "read" ? "not read" : "read";

          e.target.textContent = myLibrary[i].isRead;
        }
      }
    });
  }

  refDOM.formContainer.style.display = "none";
  resetInputs();
};

const handleFormClicks = (element) => {
  if (element.type === "text" || element.type === "number") {
    element.style.border = "none";
    element.style.backgroundColor = "#fff";
  } else if (element.id === "add-button") {
    refDOM.titleInput.value !== "" &&
    refDOM.authorInput.value !== "" &&
    refDOM.pagesInput.value !== ""
      ? handleForm()
      : validateForm();
  } else if (element.id === "form-container") {
    element.style.display = "none";
    resetInputs();
  }
};

refDOM.formContainer.addEventListener("click", (e) =>
  handleFormClicks(e.target)
);

refDOM.closeFormButton.addEventListener("click", () => {
  refDOM.formContainer.style.display = "none";
  resetInputs();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && refDOM.formContainer.style.display === "flex") {
    refDOM.formContainer.style.display = "none";
    resetInputs();
  } else if (
    e.key === "Enter" &&
    refDOM.formContainer.style.display === "flex"
  ) {
    refDOM.titleInput.value !== "" &&
    refDOM.authorInput.value !== "" &&
    refDOM.pagesInput.value !== ""
      ? handleForm()
      : validateForm();
  }
});
