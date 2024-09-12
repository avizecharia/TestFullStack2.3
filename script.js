const allSoldier = [];
const switchBtn = document.querySelector("#fullNameBtn")
const addBtn = document.querySelector("#addButton");
const [mainUp, mainDom] =
  document.querySelectorAll("main");
const [fullNameInp, rankInp, postionInp, PlatoonInp, missionTimeInp] =
  document.querySelectorAll("input");
const statusSelect = document.querySelector("select");
const table = document.querySelector("table")

// onclick add new soldier
addBtn.addEventListener("click", () => {
  const fullName = fullNameInp.value;
  const rank = rankInp.value;
  const postion = postionInp.value;
  const platoon = PlatoonInp.value;
  const missionTime = missionTimeInp.value;
  const Status = statusSelect.value
  createNewSoldier(fullName, rank, postion, platoon, missionTime,Status);

});

// create new soldier
const createNewSoldier = (fullName, rank, postion, platoon, missionTime,Status) => {
  const newSoldier = {
    fullName,
    rank,
    postion,
    platoon,
    missionTime,
    Status
  };
  allSoldier.push(newSoldier);
  saveChange();
  addSoldierToTable(newSoldier)

};

const loadAllSoldier = () => {
  return localStorage.getItem("allSoldier");
};
const saveChange = () => {
  window.localStorage.setItem("allSoldier", JSON.stringify(allSoldier));
};

const removeSoldier = (fullName) => {
  for (let i = 0; i < allSoldier.length; i++) {
    if (allSoldier[i].fullName == fullName) {
      allSoldier.splice(i, 1);
    }
  }
  saveChange();
};
const addSoldierToTable = (newSoldier) => {
    const newTr = document.createElement("tr")
    const newTh1 = document.createElement("th")
    const newTh2 = document.createElement("th")
    const newTh3 = document.createElement("th")
    const newTh4 = document.createElement("th")
    const newTh5 = document.createElement("th")
    const newTh6 = document.createElement("th")
    newTh6.className = "tr6Btn"
    const removeBtn = document.createElement("button")
    const missionCompleteBtn = document.createElement("button")
    const editBtn = document.createElement("button")
    removeBtn.textContent = "Remove"
    removeBtn.className ="thButton"
    missionCompleteBtn.textContent = "Mission"
    missionCompleteBtn.className ="thButton"
    editBtn.textContent = "Edit"
    editBtn.className = "thButton"
    newTh1.textContent = newSoldier.fullName
    newTh2.textContent = newSoldier.rank
    newTh3.textContent = newSoldier.postion
    newTh4.textContent = newSoldier.platoon
    newTh5.textContent = newSoldier.Status
    newTh6.appendChild(removeBtn)
    newTh6.appendChild(missionCompleteBtn)
    newTh6.appendChild(editBtn)
    newTr.appendChild(newTh1)
    newTr.appendChild(newTh2)
    newTr.appendChild(newTh3)
    newTr.appendChild(newTh4)
    newTr.appendChild(newTh5)
    newTr.appendChild(newTh6)
    table.appendChild(newTr)
    removeBtn.addEventListener("click" , () => {
      removeSoldier(newTh1.textContent)
      deleteTable()
      updateTable()
    })
    editBtn.addEventListener("click" ,() =>{
       mainDom.style.display = "none"
       mainUp.style.height = "100vh"
       mainUp.style.paddingBottom = "80px"
       const cancelbtn = document.createElement("button")
       cancelbtn.textContent = "cancel"
       cancelbtn.className = "selectAndAddButton"
       mainUp.lastChild.appendChild(cancelbtn)
        
    })
}

const deleteTable = () => {
    let i = table.rows.length
    while (i > 1){
        table.deleteRow(1)
        i--
    }
}

const updateTable = () => { 
    for (const solider of allSoldier) {
        addSoldierToTable(solider)
        console.log("pplkppllp");
        
    }
}

switchBtn.addEventListener("click", () => {
    deleteTable()

    allSoldier.sort(
        function(a, b) {
          var departmentNameA = a.fullName ? a.fullName : '';
          var departmentNameB = b.fullName ? b.fullName : '';
      
          return departmentNameA.localeCompare(departmentNameB);
        }
      );
      updateTable()
    
})
