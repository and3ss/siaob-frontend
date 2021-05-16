/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Não é válido',
    required: 'Campo obrigatório'
  },
  number: {
    default: 'Digite um número válido de telefone',
  },
  string: {
    email: 'Digite um e-mail válido',
  },
});

export default yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  id_setor: yup.string().required(),
});