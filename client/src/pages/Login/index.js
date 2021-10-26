import React from 'react';
import {
  Container,
  ContainerRight,
  ContainerLeft,
  ContentRight,
  ContentHeaderRight,
} from './styles';
import LoginForm from '../../components/Form';
import Title from '../../components/Title';
import Logo from '../../components/Logo';
import Link from '../../components/Link';

export default function Login() {
  return (
    <Container>
      <ContainerLeft>
        <Logo />
      </ContainerLeft>
      <ContainerRight>
        <ContentHeaderRight>
          <Logo />
        </ContentHeaderRight>
        <ContentRight>
          <Title text="Painel de Controle" />
          <LoginForm />
          <Link href="http://localhost:3000/newuser" text="Criar novo usuário" />
        </ContentRight>
      </ContainerRight>
    </Container>
  );
}
