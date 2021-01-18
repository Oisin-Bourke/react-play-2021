const { useState } = React;

function SimpleForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleChange(event) {
      const target = event.target;
      switch(target.name) {
          case 'firstName':
              setFirstName(event.target.value);
              break;
          case 'lastName':
              setLastName(event.target.value);
              break;
          default:
              break;  
      }
  }

  function handleSubmit(event) {
    alert('Submitting name: ' + firstName + ' ' + lastName);
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>
              First Name:
              <input type="text" name="firstName" value={firstName} onChange={handleChange}></input>
          </label>
          <label>
              Last Name:
              <input type="text" name="lastName" value={lastName} onChange={handleChange}></input>
          </label>
          <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

let simpleForm = document.querySelector('#simple_form');
ReactDOM.render(<SimpleForm />, simpleForm);