const students = [
    {
        id: 1,
        imageUrl: "https://assets-prd.ignimgs.com/2021/01/26/harry-potter-button-1611619333944.jpg",
        name: "Harry",
        house: "GRYFFINDOR",
    },
    {
        id: 2,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VTMC7wxQXtVWYIB7BSAgVeBs1HlGbnn-oA&s",
        name: "Hermione",
        house: "GRYFFINDOR",
    },
    {
        id: 3,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxa9WE-lbzQc9WfLYjTIv2HyC_C8ZiwrwEg&s",
        name: "Luna",
        house: "RAVENCLAW",
    },
]


// DOM connection
const domString1 = document.querySelector("#admitted"); 
const domString2 = document.querySelector("#expelled")

const renderDom = (array) => {
    domString1.innerHTML = ""; // Clear the existing content
    array.forEach((student) => {
      domString1.innerHTML += `
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


  domString1.addEventListener("click", (e) => { // listening for a click anywhere in this zone
    if (e.target.id.includes("delete")) { // if the target that is clicked has the "delete" id
      const [, id] = e.target.id.split("--"); 
      const index = students.findIndex(e => e.id === Number(id)); //turning the id string into a number and putting it in the index variable
      const expelled = students.slice(index, (index + 1)); // Put expelled student into a new array
      students.splice(index, 1); // Remove target student from students array
      domString1.innerHTML = "";
      renderDom(students);
    }
  });
  
  renderDom(students)
