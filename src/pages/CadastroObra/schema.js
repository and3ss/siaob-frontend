/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
import { setLocale } from 'yup';

import { ptForm } from 'yup-locale-pt';

setLocale(ptForm);
// setLocale({
//   mixed: {
//     default: 'Não é válido',
//     required: 'Campo obrigatório',
//     notType: "Valor ",
//     oneOf: 'deve ser um dos seguintes valores: ${values}',
//     notOneOf: 'não pode ser um dos seguintes valores: ${values}',
//   },
//   number: {
//     min: 'deve ser no mínimo ${min}',
//     max: 'deve ser no máximo ${max}',
//     lessThan: 'deve ser menor que ${less}',
//     moreThan: 'deve ser maior que ${more}',
//     notEqual: 'não pode ser igual à ${notEqual}',
//     positive: 'deve ser um número posítivo',
//     negative: 'deve ser um número negativo',
//     integer: 'deve ser um número inteiro',
//   },
//   string: {
//     length: 'deve ter exatamente ${length} caracteres',
//     min: 'deve ter pelo menos ${min} caracteres',
//     max: 'deve ter no máximo ${max} caracteres',
//     email: 'tem o formato de e-mail inválido',
//     url: 'deve ter um formato de URL válida',
//     trim: 'não deve conter espaços no início ou no fim.',
//     lowercase: 'deve estar em maiúsculo',
//     uppercase: 'deve estar em minúsculo',
//   },
// });

export default yup.object().shape({
  tipo: yup.number().required(),
  titulo: yup.string().required(),
  dataReferencia: yup.string().required(),
  dataInicioVigencia: yup.string().required(),
  dataFinalVigencia: yup.string(),
  dataPublicacao: yup.string().required(),
  dataConclusao: yup.string().required(),
  situacao: yup.string().required(),
  objeto: yup.string().required(),
  orgao: yup.string().required(),
  uf: yup.number().required(),
  cidade: yup.number().required(),
  valor: yup.number().positive().min(0).round().required(),
});