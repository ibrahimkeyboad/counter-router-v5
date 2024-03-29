import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { useHistory } from 'react-router-dom';

const JobContext = createContext();

// eslint-disable-next-line react/prop-types
function JobProvider({ children }) {
  const navigate = useHistory();

  const [name, setName] = useState('');
  const [users, setUsers] = useState(() =>
    localStorage.getItem('') ? JSON.parse(localStorage.getItem('users')) : []
  );
  const [email, setEmail] = useState('');
  const [skill, setSkill] = useState('');
  const [query, setQuery] = useState('');

  function onChangeNameEvent(e) {
    setName(e.target.value);
  }
  function onChangeEmailEvent(e) {
    setEmail(e.target.value);
  }
  function onChangeSkillEvent(e) {
    setSkill(e.target.value);
  }

  function getUser(data) {
    console.log('first');
    // dispatch({ type: 'user/get', payload: data });

    setUsers(data);
  }

  function onSearchQuery(e) {
    // dispatch({ type: 'search', payload: e.target.value });
    setQuery(e.target.value);
  }

  function getData() {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];

    if (users.length === 0) return;

    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    getUser(filterUsers);
    console.log(filterUsers);
  }

  useEffect(() => {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];

    if (users.length === 0) return;

    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    getUser(filterUsers);
    console.log(filterUsers);
  }, [query]);

  function submitHandler(e) {
    e.preventDefault();

    const newuser = {
      name: name.trim(),
      email: email.trim(),
      skill: skill.trim(),
    };

    const existUser = users.map((user) => user.email).includes(email);

    if (existUser) {
      // dispatch({ type: 'user/error', payload: 'Please use different email' });
      return;
    }

    if (!name || !email || !skill) {
      // dispatch({
      //   type: 'user/error',
      //   payload: 'Please fill all the field before you submit',
      // });

      return;
    }

    localStorage.setItem('users', JSON.stringify([...users, newuser]));

    // dispatch({ type: 'user/new', payload: newuser });

    // dispatch({ type: 'reset' });

    navigate.push('/');
  }

  const value = {
    users,
    onSubmitHandler: submitHandler,
    onChangeEmailEvent,
    onChangeNameEvent,
    onChangeSkillEvent,
    onSearchQuery,
    name,
    email,
    // error,
    skill,
    onGetData: getData,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

function useJob() {
  const context = useContext(JobContext);

  return context;
}

export { JobProvider, useJob };
