import React from "react";

const url = "api/Client";

const CreateClient = ({user, addClient }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { 
      name,
      surname,
      phonenumber,
      address,
      passport,
      carBrand,
      carModel,
      carCost,
      carColor } = e.target.elements;
    
    const client = {
        name: name.value,
        surname : surname.value,
        phonenumber : phonenumber.value,
        address : address.value,
        passport : passport.value,
        cars : [
          {
            brand : carBrand.value,
            model : carModel.value,
            cost : carCost.value,
            color : carColor.value
          }
        ],
    };

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      };

      try{
        const response = await fetch(url, requestOptions);
            if(!response.ok)
            {
                throw new Error('Fail to create client');
            }
            const data = await response.json();
            addClient(data);
            e.target.reset();
      } catch(error){
        console.log('Error creating client');
      }
    };

return (
  <React.Fragment>
  {user.isAuthenticated ? (
    <React.Fragment>
    <h3>Создание нового Клиента</h3>
    <form onSubmit={handleSubmit}>
    <label>Name: </label>
    <input type="text" name="name" placeholder="Enter Name" required />
    <br />
    <label>Surname: </label>
    <input type="text" name="surname" placeholder="Enter Surname" required />
    <br />
    <label>Phonenumber: </label>
    <input type="text" name="phonenumber" placeholder="Enter Phonenumber" required />
    <br />
    <label>Address: </label>
    <input type="text" name="address" placeholder="Enter Address" required />
    <br />
    <label>Passport: </label>
    <input type="text" name="passport" placeholder="Enter Passport" required />
    <br />
    <label>Car brand: </label>
    <input type="text" name="carBrand" placeholder="Enter Car brand" required />
    <br />
    <label>Car model: </label>
    <input type="text" name="carModel" placeholder="Enter Car model" required />
    <br />
    <label>Car cost: </label>
    <input type="text" name="carCost" placeholder="Enter Car cost" required />
    <br />
    <label>Car color: </label>
    <input type="text" name="carColor" placeholder="Enter Car color" required />
    <br />
    <button type="submit">Create</button>
    </form>
    </React.Fragment>
  ) : (
    <React.Fragment>
    </React.Fragment>
  )}
      </React.Fragment>
    );
    };
    
export default CreateClient;
