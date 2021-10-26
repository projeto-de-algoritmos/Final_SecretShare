import * as yup from 'yup';

const schema = yup.object().shape({
  user: yup
    .string()
    .required('Usuário é obrigatório!'),
  password: yup
    .string()
    .required('Senha é obrigatória!'),
});

export default schema;
