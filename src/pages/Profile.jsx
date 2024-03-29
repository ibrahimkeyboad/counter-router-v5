import { useEffect, useState } from 'react';
import Header from '../components/Heder';
import Search from '../components/job/Search';
// import { useJob } from '../context/JobContext';

function Profile() {
  // const { users } = useJob();

  const [users, setUsers] = useState(() =>
    localStorage.getItem('candidates')
      ? JSON.parse(localStorage.getItem('candidates'))
      : []
  );

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('candidates'));
    console.log(users);
  }, []);

  console.log(users);
  return (
    <>
      <Header>
        <Search />
      </Header>
      <main>
        <section>
          {users.length ? (
            users.map((user) => (
              <div key={user.name} className='card'>
                <UserItem {...user} />
              </div>
            ))
          ) : (
            <>No data yet!</>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;

// eslint-disable-next-line react/prop-types
function UserItem({ name, email, skills }) {
  return (
    <>
      <h3>{name}</h3>
      <address>{email}</address>
      {skills.map((skill) => (
        <p key={skill}>{skill}</p>
      ))}
    </>
  );
}
