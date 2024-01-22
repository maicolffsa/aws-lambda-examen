import * as yup from 'yup';

export let createTargetValidation = yup.object().shape(
    {
    card_number: yup.string()
        .required({error: "El campo Número de tarjeta no puede estar vacío"})
        .min(16,{error: "El campo Número de tarjeta debe tener 16 caracteres"})
        .max(16,{error: "El campo Número de tarjeta debe tener 16 caracteres"}),

    email: yup.string()
            .required({error: "El campo Correo no puede estar vacío"})
            .email({error: "El campo Correo no tiene un formato correcto"})
            
});