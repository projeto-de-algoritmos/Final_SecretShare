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

export default function NewUser() {
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
          <Title text="Crie um novo usuário" />
          <LoginForm />
        </ContentRight>
      </ContainerRight>
    </Container>
  );
}
