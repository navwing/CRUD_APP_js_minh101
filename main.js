let data = [];
let idUpdate = 0;
fetch("http://localhost:3000/test", {
  method: "GET",
})
  .then(function (res) {
    return res.json();
  })
  .then((dataRes) => {
    data = [...dataRes];
    render(data);
  })
  .catch(function (err) {
    console.log(err);
  });

document.getElementById("submit").addEventListener("click", function (event) {
  console.log(event);
  event.preventDefault();
  console.log("Hello");

  if (!item_username|| !item_fullname || !item_email || !item_birthday) {
    alert("Tất cả các trường đều không được trống.");
  }

  var item_username = document.getElementById("username").value;
  var item_fullname = document.getElementById("fullname").value;
  var item_email = document.getElementById("email").value;
  var item_birthday = document.getElementById("birthday").value;
  console.log(item_fullname);
  var item = {
    Username: item_username,
    Fullname: item_fullname,
    Email: item_email,
    Birthday: item_birthday,
  };


  console.log(JSON.stringify(item));
  if (idUpdate > 0) {
    const putMethod = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:3000/test/" + idUpdate, putMethod)
      .then((response) => response.data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  } else {
    fetch("http://localhost:3000/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).catch((erro) => console.log("mayngu", erro));


  }
  render();
});

function render(data) {
  table = `<tr>
    <th>STT</th>
    <th>User name</th>
    <th>Full name</th>
    <th>Email</th>
    <th>Birthday</th>
    <th>Actions</th>
    </tr>   `;
  for (let i = 0; i < data.length; i++) {
    table += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].Username}</td> 
        <td>${data[i].Fullname}</td>
        <td>${data[i].Email}</td>
        <td>${data[i].Birthday}</td>
        <th><button style=" background-color: rgb(190, 55, 55); border:none;" onclick="deleteItem('${data[i].id}')">Delete</button>
        <button style=" background-color: rgb(232, 193, 52); border:none;" onclick="editItem(event, '${data[i].id}')">Edit</button>
        </th> `;
  }
  document.getElementById("render").innerHTML = table;
}

function deleteItem(id) {

  fetch("http://localhost:3000/test/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  })
    .then((res) => res.json())
    .then((res) => console.log(res));

  render(data);
}

function editItem(event, id) {
  event.preventDefault();
  let indexUpdate = data.findIndex(function (ele) {
    return ele.id == id;
  });
  idUpdate = id;
  console.log(indexUpdate);
  document.getElementById("username").value = data[indexUpdate].Username;
  document.getElementById("fullname").value = data[indexUpdate].Fullname;
  document.getElementById("email").value = data[indexUpdate].Email;
  document.getElementById("birthday").value = data[indexUpdate].Birthday;
  // for(let i=0; i<data.length; i++){
  //   if(data[i].id==a){
  //    document.getElementById("username").value = data[i].Username;
  //    document.getElementById("fullname").value = data[i].Fullname;
  //    document.getElementById("email").value = data[i].Email;
  //    document.getElementById("birthday").value = data[i].Birthday;
  //   }
  // }
 

}
