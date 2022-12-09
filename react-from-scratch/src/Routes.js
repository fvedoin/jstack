import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import PostsList from './pages/PostsList';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={PostsList} />
            <Route path="/posts/:id" component={Post} />
            <Route path="*" component={NotFound} />
        </Switch>
    );
}