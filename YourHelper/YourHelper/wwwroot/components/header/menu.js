﻿import React, { useState, useEffect } from 'react';
import {ProfileMenu} from '../header/profileMenu';

export function Menu(props) {
    const [active, setActive] = useState('');
    const [hideLogo, setHideLogo] = useState('');
    const [hideIndex, setHideIndex] = useState('hide');
    const [visible, setVisible] = useState('hide');
    
    
    function ShowMenu(){
        if (active === ''){
            setActive('active');
        }
        else {
            setActive('');
        }

        if (hideLogo === ''){
            setHideLogo('hide');
            setHideIndex('');
        }
        else {
            setHideLogo('');
            setHideIndex('hide');
        }
        
    }
    
    function ProfileMenuVisible(){
        if (visible === ''){
            setVisible('hide');
        }
        else {
            setVisible('');
        }
    }
    
    return (<div className="container">
        <div className="header_body">
            <div className="header_burger_menu">
                <div className={"header_burger " + active} onClick={ShowMenu}>
                    <span></span>
                </div>
                <nav className={"header_menu " + active}>
                    <ul className="header_list">
                        <li>
                            <div className={"logo " + hideLogo}>
                                <a href="../../Home/Index">
                                    <img src="../../images/logo.png" alt="logo"/>
                                </a>
                            </div>
                            <a href="../../Home/Index" className={"index " + hideIndex}>Главная</a>
                        </li>
                        <li>
                            <a href="../../Home/Diary">Дневник</a>
                        </li>
                        <li>
                            <a href="../../Home/Note">Заметки</a>
                        </li>
                        <li>
                            <a href="../../Home/Schedule">Распорядок</a>
                        </li>
                        <li>
                            <a href="../../Home/Target">Цели</a>
                        </li>
                        <li>
                            <a href="../../Home/Finance">Финансы</a>
                        </li>
                        <li>
                            <a href="#">Навыки</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="search">
                <input type="text" placeholder="Поиск..."/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </div>
            <div className="header_profile" onClick={ProfileMenuVisible}>
                <h2>Профиль</h2>
            </div>
        </div>
        <ProfileMenu visible={visible}/>
    </div>);
}
