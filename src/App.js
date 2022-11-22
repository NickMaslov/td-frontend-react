import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import AddTodo from './components/AddTodo';
import Login from './components/Login';
import Signup from './components/Signup';
import TodosList from './components/TodosList';

import TodoDataService from './services/todos';

function App() {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [error, setError] = React.useState('');
    async function login(user = null) {
        TodoDataService.login(user)
            .then((response) => {
                setToken(response.data.token);
                setUser(user.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user.username);
                setError('');
            })
            .catch((e) => {
                console.log('login', e);
                setError(e.toString());
            });
    }
    console.log('<--->', user, token);

    async function logout() {
        setToken('');
        setUser('');
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
    }
    async function signup(user = null) {
        TodoDataService.signup(user)
            .then((response) => {
                setToken(response.data.token);
                setUser(user.username);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', user);
            })
            .catch((e) => {
                console.log(e);
                setError(e.toString());
            });
    }

    return (
        <div className='App'>
            {/* navbar */}
            <Navbar bg='primary' variant='dark'>
                <div className='container-fluid'>
                    <Navbar.Brand>React-bootstrap</Navbar.Brand>
                    <Nav className='me-auto'>
                        <>
                            <Link className='nav-link' to={'/todos'}>
                                Todos
                            </Link>
                            {user ? (
                                <Link className='nav-link' onClick={logout}>
                                    Logout ({user.username})
                                </Link>
                            ) : (
                                <>
                                    <Link className='nav-link' to={'/login'}>
                                        Login
                                    </Link>
                                    <Link className='nav-link' to={'/signup'}>
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </>
                    </Nav>
                </div>
            </Navbar>

            {/* routes */}
            <div className='container mt-4'>
                <Routes>
                    <Route
                        path='/todos' //{['/', '/todos']}
                        element={<TodosList token={token} />}
                    />
                    <Route
                        path='/todos/create'
                        element={<AddTodo token={token} />}
                    />
                    <Route
                        path='/todos/:id/'
                        element={<AddTodo token={token} />}
                    />
                    <Route path='/login' element={<Login login={login} />} />
                    <Route
                        path='/signup'
                        element={<Signup signup={signup} />}
                    />
                    <Route path='*' element={<TodosList token={token} />} />
                </Routes>
            </div>

            <footer className='text-center text-lg-start bg-light text-muted mt-4'>
                <div className='text-center p-4'>
                    © Copyright -{' '}
                    <a
                        target='_blank'
                        rel='noreferrer'
                        className='text-reset fw-bold text-decoration-none'
                        href='https://twitter.com/greglim81'
                    >
                        Greg Lim
                    </a>{' '}
                    -{' '}
                    <a
                        target='_blank'
                        rel='noreferrer'
                        className='text-reset fw-bold text-decoration-none'
                        href='https://twitter.com/danielgarax'
                    >
                        Daniel Correa
                    </a>{' '}
                </div>{' '}
            </footer>
        </div>
    );
}

export default App;
