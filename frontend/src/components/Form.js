import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, setOnEdit, onEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.name.value = onEdit.name;
            user.email.value = onEdit.email;
            user.phone_number.value = onEdit.phone_number;
            user.date_of_birth.value = onEdit.date_of_birth;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.name.value ||
            !user.email.value ||
            !user.phone_number.value ||
            !user.date_of_birth.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    name: user.name.value,
                    email: user.email.value,
                    phone_number: user.phone_number.value,
                    date_of_birth: user.date_of_birth.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    name: user.name.value,
                    email: user.email.value,
                    phone_number: user.phone_number.value,
                    date_of_birth: user.date_of_birth.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        user.name.value = "";
        user.email.value = "";
        user.phone_number.value = "";
        user.date_of_birth.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name"></Input>
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email"></Input>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="phone_number"></Input>
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="date_of_birth" type="date"></Input>
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
}

export default Form;