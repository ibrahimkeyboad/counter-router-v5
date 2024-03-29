import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Profile from './pages/Profile';
import SearchPage from './components/job/SearchPage';
import { JobProvider } from './context/JobContext';
import JobRegister from './components/job/Jobregister';

function App() {
  return (
    <>
      <BrowserRouter>
        <JobProvider>
          <Switch>
            <Route exact path='/'>
              <Profile />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>

            <Route path='/search'>
              <SearchPage />
            </Route>
            <Route path='/register'>
              <JobRegister />
            </Route>
            <Route path='*'>
              <p>page not found</p>
            </Route>
          </Switch>
        </JobProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
