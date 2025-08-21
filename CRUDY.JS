let users = [];  //store data
        let editingIndex = -1;




        document.getElementById("SaveBtn").addEventListener("click", function(event){
            event.preventDefault();
            saveLocalStorage();
            alert("Data stored/saved successfully");
        });

        function saveLocalStorage(){
            localStorage.setItem("users", JSON.stringify(users));
        }

        function getLocalStorage(){
            const userData = localStorage.getItem("users");
            if (userData){
                users = JSON.parse(userData);
                renderUser();
            }
        }

        //rendering users tables
        function renderUser(){
            const tbody = document.getElementById("userTableBody");
            tbody.innerHTML = "";

                users.forEach((userItem, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${userItem.name}</td>
                        <td>${userItem.email}</td>
                        <td>${userItem.Pnumber}</td>
                        <td>${userItem.password}</td>
                        <td>
                        <button onclick = "editUser(${index})">Edit</button>
                        <button onclick = "deleteUser(${index})">Delete</button>
                        </td>
                    `;

                    tbody.appendChild(row);
            });
        }
        loadLocalStorage();
        renderUser();

        // add new user or edit (global)
        function addUser(event){
            if (event && event.preventDefault) event.preventDefault();
            const nameInput = document.getElementById("nameInput");
            const emailInput = document.getElementById("emailInput");
            const PnumberInput = document.getElementById("PnumberInput");
            const PassInput = document.getElementById("PassInput");

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const Pnumber = PnumberInput.value.trim();
            const password = PassInput.value.trim();

            if (!name || !email || !Pnumber || !password){
                alert("Please fill up all requirements Thanks! ");
                return false;
            }

            if (editingIndex === -1){
                users.push({name, email, Pnumber, password});
            } else {
                users[editingIndex] = { name, email, Pnumber, password };
                editingIndex = -1;
            }

            nameInput.value = "";
            emailInput.value = "";
            PnumberInput.value = "";
            PassInput.value = "";

            saveLocalStorage();
            renderUser();
        }

        // form for editing user (global)
        function editUser(index){
            const user = users[index];
            document.getElementById("nameInput").value = user.name;
            document.getElementById("emailInput").value = user.email;
            document.getElementById("PnumberInput").value = user.Pnumber;
            document.getElementById("PassInput").value = user.password;
            editingIndex = index;
        }

        // delete user from array and refresh table (global)
        function deleteUser(index){
            users.splice(index, 1);

            saveLocalStorage();
            renderUser();
        }
        
        function loadLocalStorage(){
            const saveUsers = localStorage.getItem('users');
                if(saveUsers){
                    users = JSON.parse(saveUsers);
                }else{
                    users = [];
        }
        }
     