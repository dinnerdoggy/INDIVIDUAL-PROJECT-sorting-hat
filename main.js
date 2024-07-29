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

// Event listeners

domForm.addEventListener("click", (e) => {
    if (e.target.id.includes("nameBtn")) {
        document.querySelector("#hatCard").style.display = "none";
        domForm.innerHTML += `
        <form>
            <div class="mb-3">
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`

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

renderDom(students, domString1);
