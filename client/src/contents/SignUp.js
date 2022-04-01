import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useHTTP } from '../hooks/useAPI';
import { UserValidate } from '../lib/validate';
import styles from './SignInUp.module.css';

const SignUp = () => {
  const setErrorMessage = useOutletContext();
  const navigate = useNavigate();
  const HTTP = useHTTP();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isVaildInputsRef = useRef({ email: false, nickname: false, password: false, confirmPassword: false });
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
    return () => setErrorMessage('');
  }, []);

  useEffect(() => {
    isVaildInputsRef.current.email = UserValidate.email(email);
    isVaildInputsRef.current.nickname = UserValidate.nickname(nickname);
    isVaildInputsRef.current.password = UserValidate.password(password);
    isVaildInputsRef.current.confirmPassword = password === confirmPassword;

    if (email === '' || nickname === '' || password === '' || confirmPassword === '') setErrorMessage('');
    else if (!isVaildInputsRef.current.email) setErrorMessage('Wrong or invalid e-mail address.');
    else if (!isVaildInputsRef.current.nickname) setErrorMessage('Nickname requires minimum 4 and maximum 10 characters.');
    else if (!isVaildInputsRef.current.password)
      setErrorMessage('Password must contain at least 1 lowercase, uppercase, numeric, special character and be a 4 charctors or longer.');
    else if (!isVaildInputsRef.current.confirmPassword) setErrorMessage('Not match with password.');
    else setErrorMessage('');
  }, [email, nickname, password, confirmPassword]);

  const submitHandler = async () => {
    if (isVaildInputsRef.current.email && isVaildInputsRef.current.nickname && isVaildInputsRef.current.password && isVaildInputsRef.current.confirmPassword) {
      try {
        const data = await HTTP('post', '/users', { email, nickname, password });
        if (data.isSuccess) return navigate('/sign/in', { replace: true });
        setErrorMessage(data.message);
      } catch (error) {
        setErrorMessage('Browser Error :(');
      }
    }
  }; //TODO: fetchRooms(url, setState)

  const emailHandler = (e) => setEmail(e.target.value);
  const nicknameHandler = (e) => setNickname(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const confirmPasswordHandler = (e) => setConfirmPassword(e.target.value);

  return (
    <>
      <input
        ref={emailRef}
        className={`${styles.input} ${styles.text}`}
        type='email'
        name='email'
        placeholder='E-mail'
        autoComplete='off'
        maxLength='64'
        required
        value={email}
        onChange={emailHandler}
      />
      <input
        className={`${styles.input} ${styles.text}`}
        type='nickname'
        name='nickname'
        placeholder='Nickname'
        autoComplete='off'
        minLength='4'
        maxLength='10'
        value={nickname}
        required
        onChange={nicknameHandler}
      />
      <input
        className={`${styles.input} ${styles.text}`}
        type='password'
        name='password'
        placeholder='Password'
        autoComplete='new-password'
        minLength='4'
        required
        value={password}
        onChange={passwordHandler}
      />
      <input
        className={`${styles.input} ${styles.text} ${styles.lastText}`}
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        autoComplete='off'
        minLength='4'
        required
        value={confirmPassword}
        onChange={confirmPasswordHandler}
      />
      <button className={`${styles.input} ${styles.button}`} onClick={submitHandler}>
        Sign Up
      </button>
      <Link to='/sign/in'>
        <button className={`${styles.input} ${styles.button}`}>Sign In</button>
      </Link>
    </>
  );
};

export default SignUp;
