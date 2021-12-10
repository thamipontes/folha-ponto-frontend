import {Component, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import UserService from './../../service/user.service';
import { PageHeader } from '../../components/pageHeader/PageHeader';


function BatidasPage () {


    const [momento, setMomento] = useState('');
    const [data, setData] = useState('');
    const [hora, setData] = useState('');
    const [momento, setMomento] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMomento((prevState =>{
            return{
                ...prevState,
                [name]: value
            }
        }))
    }

    const handleCreateBatidas = (e) =>{
        e.preventDefault();

        setSubmitted(true);

        setLoading(true);

        UserService.registrarBatida(data, hora).then(data => {
            history.push('/landing');
        }, error => {
            console.log(error);
            setErrorMessage('Not Valid');
            setLoading(false);
        })
    }

    return(
        <div id="page-teacher-form" className="container">
        <PageHeader />
        <main>
            <form action="" onSubmit={(event) => handleCreateBatidas(event)}
                noValidate
                className={submitted ? 'was-validated' : ''}
            >
            <fieldset>
                <legend>Horário Batida</legend>
                <div className="form-group">
                        <label htmlFor="login"> Data </label>
                        <input type="date"
                        className="form-control"
                        name="data"
                        required
                        value = {data}
                        onChange = {(event => handleChange(event))}/>

                        <div className="invalid-feedback">
                            Login Invalido
                        </div>
                    </div>
                <Input
                    name="avatar"
                    label="Avatar" 
                    value={avatar}
                    onChange={(e) => {setAvatar(e.target.value)}}
                />
                <Input
                    name="whatsapp"
                    label="WhatsApp" 
                    value={whatsapp}
                    onChange={(e) => {setWhatsapp(e.target.value)}}
                />
                <Textarea
                    name="bio"
                    label="Biografia"
                    value={bio}
                    onChange={(e) => {setBio(e.target.value)}}
                />
            </fieldset>

            <fieldset>
                <legend>Sobre a Aula</legend>
                <Select 
                    name="subject"
                    label="Matéria"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    options={[
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciências', label: 'Ciências'},
                        {value: 'Educação Física', label: 'Educação Física'},
                        {value: 'Física', label: 'Física'},
                        {value: 'Química', label: 'Química'},
                        {value: 'Geografia', label: 'Geografia'},
                        {value: 'História', label: 'História'},
                        {value: 'Matemática', label: 'Matemática'},
                        {value: 'Português', label: 'Português'}
                    ]} 
                />
                <Input
                    name="cost"
                    label="Custo da sua hora por aula"
                    value={cost}
                    onChange={(e) => {setCost(e.target.value)}}
                />
                
            </fieldset>

            <fieldset>
                <legend>Horários disponíveis
                <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                </legend>
                {scheduleItems.map((scheduleItem, index) => {
                    return(
                        <div key={scheduleItem.week_day} className="schedule-item">
                            <Select 
                                name="week_day"
                                label="Dia da Semana"
                                
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    {value: '0', label: 'Domingo'},
                                    {value: '1', label: 'Segunda-feira'},
                                    {value: '2', label: 'Terça-feira'},
                                    {value: '3', label: 'Quarta-feira'},
                                    {value: '4', label: 'Quinta-feira'},
                                    {value: '5', label: 'Sexta-feira'},
                                    {value: '6', label: 'Sábado'},
                                ]} 
                            />
                            <Input
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                value={scheduleItem.from}
                                name="from"
                                label="Das"
                                type="time" />
                            <Input
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                value={scheduleItem.to}
                                name="to"
                                label="Até"
                                type="time" />
                        </div>
                    );
                })}

            </fieldset>

            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso Importante"/>
                    Importante! <br />
                    Preencha todos os dados
                </p>
                <button type="submit">Salvar Cadastro</button>

            </footer>
            
        </form>
        </main>
    </div>
    );



} 
   