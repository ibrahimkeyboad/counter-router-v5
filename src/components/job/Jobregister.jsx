import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function JobRegister() {
  // const {
  //   name,
  //   email,
  //   skill,
  //   onSubmitHandler,
  //   onChangeEmailEvent,
  //   onChangeNameEvent,
  //   onChangeSkillEvent,
  //   error,
  // } = useJob();

  const navigate = useHistory();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: '',
    skills: '',
  });

  const { email, name, role, skills } = formState;
  const [error, setError] = useState('');

  function handlerChange(e) {
    const { name, value } = e.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSChangekills(e) {
    setFormState((prevState) => ({ ...prevState, skills: e.target.value }));
  }

  function handleSkills() {
    setFormState((prevState) => ({ ...prevState, skills: skills.split(',') }));
  }

  console.log(formState.skills);

  function submitHandler(e) {
    e.preventDefault();

    const candidates = localStorage.getItem('candidates')
      ? JSON.parse(localStorage.getItem('candidates'))
      : [];

    const existEmail = candidates.map((candidate) => candidate.email);

    console.log(existEmail);

    if (existEmail === email) {
      setError('Email already exist');

      return;
    }

    localStorage.setItem(
      'candidates',
      JSON.stringify([...candidates, formState])
    );

    navigate.push('/');
  }

  return (
    <div>
      <button onClick={() => navigate.goBack()}>Back</button>

      <form onSubmit={submitHandler}>
        <input
          required
          name='name'
          value={name}
          onChange={handlerChange}
          type='text'
          placeholder='Name'
        />

        <input
          name='email'
          required
          value={email}
          onChange={handlerChange}
          type='email'
          placeholder='Email address'
        />

        <div style={{ display: 'flex', gap: '20px' }}>
          <input
            name='skills'
            required
            value={skills}
            onChange={handleSChangekills}
            type='text'
            placeholder='Write your skills'
          />

          <button onClick={handleSkills} type='button'>
            add skills
          </button>
        </div>

        <select name='role' value={role} onChange={handlerChange}>
          <option value=''>Select your skill</option>
          <option value='driver'>Driver</option>
          <option value='developer'>Developer</option>
          <option value='singer'>Singer</option>
        </select>

        <button type='submit'>Submit</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  );
}

export default JobRegister;
