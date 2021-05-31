import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {ReducerContext} from '../store';
import {Dropdown} from "../ui/dropdown";
import {Validation} from "../validation/validation";

export function EditTarget(props){

    const [categories, setCategories] = useState([{id: '0', category: 'Выполнена'}, {id: '1', category: 'В процессе'}, {id: '2', category: 'Провалена'}]);
    const [select, setSelect] = useState('');
    const [ text, setText ] = useState('');
    const [ timeStart, setTimeStart ] = useState('');
    const [ timeEnd, setTimeEnd ] = useState('');
    const [ id, setId] = useState('');
    const [ message, setMessage] = useState('');
    const [ description, setDescription ] = useState('');

    const { state, dispatch } = useContext(ReducerContext);

    useEffect(() => {
        setId(state.target.editTargetData.id);
        setText(state.target.editTargetData.text);
        setTimeStart(state.target.editTargetTimeStart)
        setTimeEnd(state.target.editTargetTimeEnd);
        setSelect(state.target.editTargetData.status);
        setDescription(state.target.editTargetData.description);
    }, [state.target.editTargetData]);

    function filter(){

        if (text === '' || text === ' ' || timeStart === '' || timeEnd === '' || description === '' || description === ' '){
            setMessage('Поля не должны быть пустыми');
            return true;
        }

        if (CheckDateTime()){
            setMessage('Ошибка в постановке дат и времени');
            return true;
        }

        return false;
    }

    function cleaning(){
        setMessage('');
        setId(state.target.editTargetData.id);
        setText(state.target.editTargetData.text);
        setTimeStart(state.target.editTargetTimeStart)
        setTimeEnd(state.target.editTargetTimeEnd);
        setSelect(state.target.editTargetData.status);
        setDescription(state.target.editTargetData.description);
    }
    
    function CheckDateTime(){
        let Start = new Date(timeStart);
        let End = new Date(timeEnd);

        if(Date.parse(Start.toString()) >= Date.parse(End.toString())){
            return true;
        }

        return false;
    }

    function onConfirm(){
        
        let dateStart = timeStart.slice(8, 10) + '.' + timeStart.slice(5, 7) + '.' + timeStart.slice(0, 4) + ' ' + timeStart.slice(11, 16) + ':00';
        let dateEnd = timeEnd.slice(8, 10) + '.' + timeEnd.slice(5, 7) + '.' + timeEnd.slice(0, 4) + ' ' + timeEnd.slice(11, 16) + ':00';

        if(filter()){
            return;
        }

        axios({
            method: 'post',
            url: '/Target/EditTarget',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: id,
                Status: select,
                Text: text,
                TimeStart: dateStart,
                TimeEnd: dateEnd,
                Description: description
            }

        })
            .then(function (response) {
                cleaning();

                dispatch({type: 'EDIT_FORM_HIDE_TARGET'});
                dispatch({type: 'TOKEN'});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onCancel(){
        cleaning();

        dispatch({type: 'EDIT_FORM_HIDE_TARGET'});
    }

    function onChangeSelect(value){
        setSelect(value);
    }

    function onDescriptionChange(value){
        value = value.replace(/\s+/g, ' ');

        setDescription(value);
    }


    function onTextChange(value){
        value = value.replace(/\s+/g, ' ');

        setText(value);
    }
    
    return(<div className={"edit-target " + state.target.editTarget}>
        <h3>Редактирование цели</h3>
        <div className={'title'}>
            <input type="text" placeholder={'Название'} value={text} maxLength={16} onChange={e => onTextChange(e.target.value)}/>
        </div>
        <div>
            <div className={'date'}>
                <p>Начало</p>
                <input type="datetime-local" value={timeStart} onChange={e => setTimeStart(e.target.value)}/>
            </div>
            <div className={'date'}>
                <p>Конец</p>
                <input type="datetime-local" value={timeEnd} onChange={e => setTimeEnd(e.target.value)}/>
            </div>
        </div>
        <Dropdown categories={categories} select={select} onChangeSelect={onChangeSelect}/>
        <div className="edit-description">
            <textarea placeholder="Описание" value={description} onChange={e => onDescriptionChange(e.target.value)}/>
        </div>
        <Validation message={message}/>
        <div className="edit-buttons">
            <div className="confirm button" onClick={() => onConfirm()}>
                <p>Подтвердить</p>
            </div>
            <div className="cancel button" onClick={() => onCancel()} >
                <p>Отмена</p>
            </div>
        </div>
    </div>);
}