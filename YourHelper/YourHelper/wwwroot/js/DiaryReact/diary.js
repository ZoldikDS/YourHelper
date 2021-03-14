﻿var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

const { useState, useEffect } = React;

function Diary(props){

    const [text, setText] = useState('');
    const [diary, setDiary] = useState([]);
    const [date, setDate] = useState((new Date()).toLocaleString("ru", options));
    const [dates, setDates] = useState([]);
    const [check, setCheck] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [hide, setHide] = useState('hide');
    const [hideEdit, setHideEdit] = useState('hide');
    const [editDate, setEditDate] = useState('');
    
    useEffect(() => {

        LoadEntries();

    }, [date, check]);
    
    function onTextChange(value){
        setText(value);
    }
    
    function onRemove(entry){
        axios({
            method: 'post',
            url: '/Diary/RemoveEntry',
            headers: { 'Content-Type': 'application/json' },
            data: {
                Id: entry.id
            }
        })
            .then(function (response) {
                setCheck(!check);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function onEdit(entry){
       setText(entry.text);
       setEdit(true);
       setEditId(entry.id);
       setEditDate(entry.dateTime.substr(0,16));
       setHideEdit('');
        
        console.log(entry.id)
    }
    
    function LoadEntries(){
        axios({
            method: 'post',
            url: '/Diary/GetEntries',
            headers: { 'Content-Type': 'application/json' },
            data: {
                DateTime: date
            }
        })
            .then(function (response) {
                setDiary(response.data);
                LoadDates();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function LoadDates(){
        axios({
            method: 'get',
            url: '/Diary/GetDates',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                setDates(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function onCancel(){
        setText('');
        setEdit(false);
        setEditId('');
        setEditDate('');
        setHideEdit('hide');
    }

    async function onSend(){
        if(text === ""){
            return;
        }

        let dateTime = date + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        
        if (edit === true){
            axios({
                method: 'post',
                url: '/Diary/EditEntry',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Id: editId,
                    text: text
                }
            })
                .then(function (response) {
                    onCancel();
                    setDiary([]);
                    LoadEntries();
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        else{
            if((new Date()).toLocaleString("ru", options) !== date){
                setHide('')
                return;
            }
            else {
                setHide('hide')
            }

            axios({
                method: 'post',
                url: '/Diary/AddEntry',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Text: text,
                    DateTime: dateTime
                }
            })
                .then(function (response) {
                    setText('');
                    LoadEntries();
                })
                .catch(function (error) {
                    console.log(error.response.data);
                });
        }
        
    }
        return (
            <div>
                <DatePicker date={date} dates={dates} changeDate={setDate}/>
                <Sheet diary={diary} onRemove={onRemove} onEdit={onEdit}/>
                <div className={"info " + hide}>
                    <p>Добавлять новые записи можно только на {(new Date()).toLocaleString("ru", options)}</p>
                </div>
                <div className={"edit-info " + hideEdit}>
                    <p>Редактирование записи {editDate}</p>
                    <p className="cancel" onClick={onCancel}>Отмена</p>
                </div>
                <div className="diary-add-area">
                    <textarea placeholder="Напишите сюда свои мысли... " value={text} onChange={text => onTextChange(text.target.value)} className="text"></textarea>
                    <div className="send-button" onClick={onSend}>
                        <div className="send-icon"></div>
                    </div>
                </div>
            </div>
        );
    

}

ReactDOM.render(
    <Diary />,
    document.querySelector('.diary')
);