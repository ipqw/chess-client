import { observer } from "mobx-react";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Game, serverStore } from "../store/server";
import { Modal as BaseModal, Input } from '@mui/base';
import clsx from 'clsx';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button as BaseButton } from '@mui/material' 
import { store } from "../store";
import { useNavigate } from "react-router-dom";
const MainPage: FC = observer(() => {
    const navigate = useNavigate()
    useEffect(() => {
        serverStore.setStatus(null)
        serverStore.setGame(null)
    }, [])
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('')
    const [color, setColor] = useState<boolean | null>(null)
    const createGame = async () => {
        const response: Game | void = await fetch(`${store.server}game`, {
            method: 'POST',
            body: JSON.stringify({name, ownerColor: color}),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.json();
        })
        .catch(() => {
            console.error('Server is not working')
        })
        if(response?.id){
            navigate(`/game/${response.id}`)
        }
    }
    return(
        <Wrapper>
            <ButtonWrapper>
                <Button href="/find">Найти игру</Button>
                <Button onClick={() => setOpen(true)}>Создать игру</Button>
                <Button href="/localgame">Играть на одном компьютере</Button>
                <Modal open={open} onClose={() => setOpen(false)} slots={{ backdrop: StyledBackdrop }}>
                    <ModalWrapper>
                        <ModalTitle>Создать игру</ModalTitle>
                        <DataWrapper>
                            <InputWrapper>
                                <ModalText>Имя игры: </ModalText><ModalInput value={name} onChange={(e) => {setName(e.target.value)}} />
                            </InputWrapper>
                            <InputWrapper>
                                <ModalText style={{marginTop: 7}}>Цвет: </ModalText>
                                <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="random"
                                            name="radio-buttons-group"
                                            style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', fontSize: 'calc(14px + 0.4vw)'}}
                                        >
                                            <FormControlLabel name="white" onClick={() => setColor(true)} value="white" control={<Radio />} label="Белый" />
                                            <FormControlLabel name='black' onClick={() => setColor(false)} value="black" control={<Radio />} label="Черный" />
                                            <FormControlLabel name='random' onClick={() => setColor(null)} value="random" control={<Radio />} label="Случайный" />
                                        </RadioGroup>
                                </FormControl>
                            </InputWrapper>
                            <FormButton onClick={() => {createGame(); setOpen(false)}}>Создать</FormButton>
                        </DataWrapper>
                    </ModalWrapper>
                </Modal>
            </ButtonWrapper>
        </Wrapper>
    )
})
const ModalInput = styled(Input)`
    margin-top: 15px;
    @media (min-width: 260px) {
        margin: 0px;
    }
`
const FormButton = styled(BaseButton)`
    align-self: center;
    cursor: pointer;
    font-size: 20px;
    margin-top: 10px;
    color: #a0a0a0;
    font-family: "Noto Sans", Sans-Serif;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 5px;
    align-items: center;
    justify-content: center;
    @media (min-width: 260px) {
        max-width: 200px;
        flex-direction: row;
        justify-content: left;
    }
`
const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(43, 43, 43);
    padding: 30px;
    border-radius: 10px;
    max-width: 150px;
    @media (min-width: 260px) {
        max-width: 200px;
    } 
    @media (min-width: 320px) {
        max-width: 250px;
    } 
    @media (min-width: 481px) {
        max-width: 400px;
    } 
    @media (min-width: 769px) {
        max-width: 500px;
    }
    @media (min-width: 1025px) {
        max-width: 700px;
    }
`
const ModalTitle = styled.p`
    font-size: calc(26px + 0.8vw);
    margin-bottom: 30px;
    cursor: default;
`
const ModalText = styled.p`
    padding-right: 15px;
    font-size: calc(14px + 0.4vw);
`

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 70vh;
`

const Button = styled.a`
    border-radius: 10px;
    background-color: #3f3d38;
    text-decoration: none;
    color: #929999;
    padding: 15px;
    cursor: pointer;
    text-align: center;
    font-size: calc(18px + 0.7vw);
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`


const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
    //@ts-ignore
  const { ownerState, open, className,  ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
export default MainPage