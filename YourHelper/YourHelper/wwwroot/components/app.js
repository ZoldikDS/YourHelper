﻿import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from './account/login';
import {Register} from './account/register';
import {Recovery} from './account/recovery';
import {Settings} from './account/settings';
import {General} from './general/general';
import {Diary} from './diary/diary';
import {Note} from './note/note';
import Store from './Store';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Store>
                        <Switch>
                            <Route strict path="/Account/Login" component={Login} />
                            <Route strict path="/Account/Register" component={Register} />
                            <Route strict path="/Account/Recovery" component={Recovery} />
                            <Route strict path="/Account/Settings" component={Settings} />
                            <Route strict path="/Home/Index" component={General} />
                            <Route strict path="/Home/Diary" component={Diary} />
                            <Route strict path="/Home/Note" component={Note} />
                            <Route strict path="/" component={General} />
                        </Switch>
                    </Store>
                </div>
            </Router>
        );
    }
};