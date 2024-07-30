const students = [
    {
        id: 1,
        //imageUrl: "https://assets-prd.ignimgs.com/2021/01/26/harry-potter-button-1611619333944.jpg",
        name: "Harry",
        house: "GRYFFINDOR",
    },
    {
        id: 2,
        //imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VTMC7wxQXtVWYIB7BSAgVeBs1HlGbnn-oA&s",
        name: "Hermione",
        house: "GRYFFINDOR",
    },
    {
        id: 3,
        //imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxa9WE-lbzQc9WfLYjTIv2HyC_C8ZiwrwEg&s",
        name: "Luna",
        house: "RAVENCLAW",
    },
]

const expelled = [];
const filterArray = [];

// DOM connection
const domForm = document.querySelector("#hat-container");
const domString1 = document.querySelector("#admitted"); 
const domString2 = document.querySelector("#expelled");

// Render display function
const renderDom = (array, dom) => {
    dom.innerHTML = ""; // Clear the existing content
    array.forEach((student) => {
      dom.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
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

domForm.innerHTML += `
        <form id="nameForm">
            <div class="mb-3">
                <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
            </div>
            <button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
        </form>
        `;

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
        }})
        renderDom(filterArray, domString1);
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

const createStudent = (e) => {
    //e.preventDefault();

    const newStudentObject = {
        id: students.length + 1,
        name: document.querySelector("#nameInput").value,
        house: houses[randomHouse()],
        };

    students.push(newStudentObject);
    domString1.innerHTML = "";
    renderDom(students, domString1);
    nameFrm.reset();
}



renderDom(students, domString1);
