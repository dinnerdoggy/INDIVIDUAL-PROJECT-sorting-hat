const students = [
    {
        id: 1,
        name: "Luna",
        house: "RAVENCLAW",
    },
    {
        id: 2,
        name: "Hermione",
        house: "GRYFFINDOR",
    },
    {
        id: 3,
        name: "Harry",
        house: "GRYFFINDOR",
    },
    {
        id: 4,
        name: "Ernie",
        house: "HUFFLEPUFF",
    },
    {
        id: 5,
        name: "Draco",
        house: "SLYTHERIN",
    }
]

const expelled = [];
const filterArray = [];

// .sort() has a lot going on under the hood that I don't get, but in essence... it sorts :D
// .localCompare() returns the value -1, 0, or 1. This is based on how they would be sorted.
// Used together in this context, sort receives the numeric value returned by localCompare and sorts the objects based on that
const sortStudents = () => {
    students.sort((currentStudent, nextStudent) => currentStudent.name.localeCompare(nextStudent.name));
    return students;
}

// Sorting the students array before it's rendered to the page
sortStudents();


// DOM connection
const domForm = document.querySelector("#hat-container");
const domString1 = document.querySelector(".studentCards"); 
const domString2 = document.querySelector(".expelledCards");
const domBanner = document.querySelector(".col-md-4");

// Render display function
const renderDom = (array, dom) => {
    dom.innerHTML = ""; // Clear the existing content
    array.forEach((student) => { // looping throught the array passed in, and creating a card on the array for each item in the array
      dom.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 ${student.house}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${student.name}</h5>
                        <p class="card-text">${student.house}</p>
                        <button id="delete--${student.id}" class="expelBtn">EXPEL</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    });
};

// This is the name submit form
function makeForm() {
    domForm.innerHTML += `
            <form id="nameForm">
                <div class="mb-3">
                    <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
                </div>
                <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
            </form>
            `;
}

makeForm();

const nameFrm = document.querySelector("#nameForm");
const hatCard = document.querySelector("#hatCard");
const btnWrapper = document.querySelector("#btnWrapper");

// Event listeners
btnWrapper.addEventListener("click", (e) => {
    if (e.target.id.includes("Btn")) {
        const house = e.target.getAttribute("data-filter");
        students.map((student) => {
        if (student.house === house) {
            filterArray.push(student)
            renderDom(filterArray, domString1);
        } else if (house === "ALL") {
            renderDom(students, domString1);
        } else if (filterArray.length === 0) {
            renderDom(filterArray, domString1)
        }})
        filterArray.length = 0;
    }
    }
)

// Hide elements not in use
domForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id.includes("nameBtn")) {
        hatCard.style.display = "none";
        nameFrm.style.display = "block";
        
    } else if (e.target.id.includes("submitBtn")) {
        nameFrm.style.display = "none";
        hatCard.style.display = "block";
        domForm.addEventListener("submit", createStudent());
    }
})

domString1.addEventListener("click", (e) => { // listening for a click anywhere in this zone
  if (e.target.id.includes("delete")) { // if the target that is clicked has the "delete" id
    const [, id] = e.target.id.split("--"); 
    const index = students.findIndex(e => e.id === Number(id)); //turning the id string into a number and putting it in the index variable
    const dummies = students.slice(index, (index + 1)); // Put expelled student into a new array
    expelled.push(dummies[0]);
    students.splice(index, 1); // Remove target student from students
    domString1.innerHTML = "";
    domString2.innerHTML = "";
    renderDom(students, domString1);
    renderDom(expelled, domString2);
  }
});

// Create a new student after entering name and clicking the submit button

const houses = ["GRYFFINDOR", "RAVENCLAW", "SLYTHERIN", "HUFFLEPUFF"];

function randomHouse() {
    return Math.floor(Math.random() * 4);
  };

const createStudent = () => {

    const newStudentObject = {
        id: students.length + 1,
        name: document.querySelector("#nameInput").value,
        house: houses[randomHouse()],
        };

    students.push(newStudentObject);

    sortStudents();

    domString1.innerHTML = "";
    renderDom(students, domString1);
    nameFrm.reset();
}



renderDom(students, domString1);
