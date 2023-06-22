function ValidateForm() {
    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let phone = document.getElementById('inputPhone').value;
  
    if (email === '') {
      alert('El campo correo es requerido');
      return false;
    } else if (!email.includes('@')) {
      alert('El correo no es válido');
      return false;
    }
  
    if (name === '') {
      alert('El campo nombre es requerido');
      return false;
    }
  
    if (phone === '') {
      alert('El campo teléfono es requerido');
      return false;
    }
  
    return true; // Agregado: Devuelve true si el formulario es válido
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    ReadData();
  });
  
  function ReadData() {
    let listPeople;
  
    if (localStorage.getItem('listPeople') === null) {
      listPeople = [];
    } else {
      listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }
  
    let html = '';
  
    listPeople.forEach(function (Element, index) {
      html += '<tr>';
      html += '<td>' + Element.email + '</td>';
      html += '<td>' + Element.name + '</td>';
      html += '<td>' + Element.phone + '</td>';
      html +=
        '<td><button onclick="deleteData(' +
        index +
        ')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData(' +
        index +
        ')" class="btn btn-warning">Editar Dato</button></td>';
      html += '</tr>';
    });
  
    document.querySelector('#tableData').innerHTML = html;
  }
  
  // document.onload no es un evento válido, se cambió a window.onload
  window.onload = ReadData; // Eliminado los paréntesis de ReadData ya que no es una función de llamada inmediata
  
  function AddData() {
    if (ValidateForm()) { // Se eliminó "== true" ya que ValidateForm ya devuelve un valor booleano
      let email = document.getElementById('inputEmail').value;
      let name = document.getElementById('inputName').value;
      let phone = document.getElementById('inputPhone').value;
  
      let listPeople;
  
      if (localStorage.getItem('listPeople') === null) {
        listPeople = [];
      } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
      }
  
      listPeople.push({
        email: email,
        name: name,
        phone: phone,
      });
  
      localStorage.setItem('listPeople', JSON.stringify(listPeople));
  
      ReadData();
  
      document.getElementById('inputEmail').value = '';
      document.getElementById('inputName').value = '';
      document.getElementById('inputPhone').value = '';
    }
  }

  function deleteData(index){
        let listPeople;

        if (localStorage.getItem('listPeople') == null){
            listPeople = [];
        }else{
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        listPeople.splice(index, 1);
        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        ReadData();
  }

  function editData(index) {
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople;

        if (localStorage.getItem('listPeople') == null){
            listPeople = [];
        }else{
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        document.getElementById('inputEmail').value = listPeople[index].email;
        document.getElementById('inputName').value = listPeople[index].name;
        document.getElementById('inputPhone').value = listPeople[index].phone;

        document.querySelector('#btnUpdate').onclick = function () {
            if (ValidateForm() == true) {
                listPeople[index].email = document.getElementById('inputEmail').value;
                listPeople[index].name = document.getElementById('inputName').value;
                listPeople[index].phone = document.getElementById('inputPhone').value;

                localStorage.setItem('listPeople', JSON.stringify(listPeople));
                ReadData();

                document.getElementById('inputEmail').value = "";
                document.getElementById('inputName').value = "";
                document.getElementById('inputPhone').value = "";

                document.getElementById('btnAdd').style.display = 'block';
                document.getElementById('btnUpdate').style.display = 'none';
                
            }
        };
  }
  

