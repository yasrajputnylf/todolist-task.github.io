let listDate = document.querySelector('#list-date');
let listFullName = document.querySelector('#list-full-name');
let listNickName = document.querySelector('#list-nick-name');
let showContentDataBox = document.querySelector('#showContentDataBox');
let listContent = [];
let eventDone = false;

let saveModalForm =   () => {
  let saveModalFormDataObj = {
    'date' : listDate.value , 
    'fullname' : listFullName.value , 
    'nickname' : listNickName.value  ,
    'done' : false,
   }

   if(saveModalFormDataObj.fullname === "" || saveModalFormDataObj.nickname === "" || saveModalFormDataObj.date === ""){
    alert("Enter The Values")
   }

   else{
    listContent.push(saveModalFormDataObj)
   }

   
   showListBoxContent();
} 

let showListBoxContent = () => {
    showContentDataBox.innerHTML = '';
    listContent.forEach((value,index)=>{
    let html =  `
          <div class="col-12 border-bottom py-4 ">
            <div class="row align-items-center justify-content-between" >
               <div class="col-auto  ">
                <div class="fs-4">${value.fullname}</div>
                <div class="mb-2 d-flex align-items-center justify-content-between ">
                    <div class="date me-2 fw-light ">${value.date}</div>
                    <div class="divider"></div>
                    <div class="nick-name mx-2 fw-light ">${value.nickname}</div>
                </div>
              </div> 
              <div class="col-auto">
                <i id="mark-done-${index}" class="mark-done fa-solid fa-circle-check fa-2xl me-3 d-none mark-as-done" style="color: #37be47;"></i>
                <i onclick="showDialog(${index})" id="click-event"  class="fa-solid fa-ellipsis-vertical fa-2xl position-relative" style="color: #37be47;">
                  <div id="dialog${index}" class="popup dot-box text-start p-2 d-none bg-white ">
                    <p id="mark-para-${index}" onclick="markAsDone(${index})" class="p-tag m-0 text-start py-3 border-bottom">Mark As Done</p>
                    <p onclick="deleteTask(${index})" class="p-tag m-0 text-start py-3 ">Delete</p>
                  </div>
                </i>
              </div>
            </div>
          </div> `
        //   markAsDone();
        showContentDataBox.innerHTML =  showContentDataBox.innerHTML + html ;
        changeDone()
  })
}

function changeDone(){
    let size = document.querySelectorAll(".mark-done").length
    for(let j=0;j<size;j++)
    {
        if(listContent[j].done===true)
        {
            document.querySelector(`#mark-done-${j}`).classList.remove("d-none")
            document.querySelector(`#mark-para-${j}`).innerHTML = "Mark As UnDone"
        }
        else{
          document.querySelector(`#mark-done-${j}`).classList.add("d-none")
          document.querySelector(`#mark-para-${j}`).innerHTML = "Mark As Done"
        }
    }
}

let markAsDone = (i) =>{

  if(listContent[i].done===true){
    listContent[i].done = false;
  }

  else{
    listContent[i].done = true;
  }
    changeDone()
}

const deleteTask = (index)=>{
    listContent.splice(index,1);
    showListBoxContent();
}


function showDialog(i) {

  const dialog = document.querySelector(`#dialog${i}`);
  dialog.classList.toggle("d-none");

  function hideDialog() {
    dialog.classList.add("d-none");
    document.querySelector("#body").removeEventListener("click", hideDialog);
  }

  function showDialogBox() {
    dialog.classList.remove("d-none");
    const popups = document.querySelectorAll(".popup");

      for (let j=0;j<popups.length;j++) {
        if (i!==j) {
          document.querySelector(`#dialog${j}`).classList.add("d-none");
        }
      }

    setTimeout(() => {
      document.querySelector("#body").addEventListener("click", hideDialog);
      }, 100);
  }

  if (!dialog.classList.contains("d-none")) {
    showDialogBox();
    } else {
      hideDialog();
    }
}