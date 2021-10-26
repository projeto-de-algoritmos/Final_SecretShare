import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import schema from './validation';
import { newUser } from '../../services/ApiService';

export default function NewUserForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [errorText, setErrorText] = useState();
  // const [alertLogin, setAlertLogin] = useState(false);
  const [user] = useState('');
  const [password] = useState('');

  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitNewUserForm = async () => {
    const res = await newUser(user);

    setApiResponse(res.status);
    setErrorText('Novo usuário criado com sucesso!');
    history.push('/login');
  };
  const enabled = (user.length > 0 && password.length > 0);

  const handleCloseErros = () => setShowMessage(false);
  const handleCloseAlertLogin = () => setApiResponse(false);

  useEffect(() => {
    if (errors.user?.message) {
      setShowMessage(true);
    }
  }, [errors]);

  useEffect(() => {
    if (errors.password?.message) {
      setShowMessage(true);
    }
  }, [errors]);

  return (
    <>
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseErros}
          severity="error"
          variant="filled"
        >
          {errors.user ? errors.user?.message : errors.password?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={apiResponse}
      >
        <Alert
          onClose={handleCloseAlertLogin}
          severity="success"
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
      <form
        style={{
          display: 'grid',
          justifyItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmitNewUserForm)}
      >
        <Input
          name="user"
          value={user}
          register={register}
          placeholder="usuário"
        />
        <Input
          name="password"
          value={password}
          register={register}
          type="password"
          placeholder="senha"
        />
        {
         enabled
           ? <Button text="Criar" />
           : <Button text="Criar" disabled />
       }
      </form>
    </>
  );
}
