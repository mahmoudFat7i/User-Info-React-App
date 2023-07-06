//using refs  -- uncontrolled component
//commented next using usestate
import { useState, useRef } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUser = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredUser.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age ( non-empty values).'
      });
      return;
    }
    if (+enteredUserAge < 0) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age ( > 0).'
      });
      return;
    }
    props.onAddUser(enteredUser, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;

/*-----------------------------*/

//using usestate - controlled component
//import { useState, useRef } from 'react';
//import Button from '../UI/Button';
//import Card from '../UI/Card';
//import classes from './AddUser.module.css';
//import ErrorModal from '../UI/ErrorModal';

//const AddUser = (props) => {
//  const [enteredUsername, setEnteredUsername] = useState('');
//  const [enteredAge, setEnteredAge] = useState('');
//  const [error, setError] = useState();

//  const addUserHandler = (event) => {
//    event.preventDefault();
//    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
//      setError({
//        title: 'Invalid Input',
//        message: 'Please enter a valid name and age ( non-empty values).'
//      });
//      return;
//    }
//    if (+enteredAge < 0) {
//      setError({
//        title: 'Invalid age',
//        message: 'Please enter a valid age ( > 0).'
//      });
//      return;
//    }
//    props.onAddUser(enteredUsername, enteredAge);
//    setEnteredUsername('');
//    setEnteredAge('');
//  };

//  const usernameChangeHandler = (event) => {
//    setEnteredUsername(event.target.value);
//  };

//  const ageChangeHandler = (event) => {
//    setEnteredAge(event.target.value);
//  };

//  const errorHandler = () => {
//    setError(null);
//  };

//  return (
//    <div>
//      {error && (
//        <ErrorModal
//          onConfirm={errorHandler}
//          title={error.title}
//          message={error.message}
//        />
//      )}
//      <Card className={classes.input}>
//        <form onSubmit={addUserHandler}>
//          <label htmlFor="username">UserName</label>
//          <input
//            id="username"
//            type="text"
//            value={enteredUsername}
//            onChange={usernameChangeHandler}
//          />
//          <label htmlFor="age">Age (years)</label>
//          <input
//            id="age"
//            type="number"
//            value={enteredAge}
//            onChange={ageChangeHandler}
//          />
//          <Button type="submit">Add User</Button>
//        </form>
//      </Card>
//    </div>
//  );
//};
//export default AddUser;
