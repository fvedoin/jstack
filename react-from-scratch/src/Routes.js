import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import PostsList from './pages/PostsList';

import { useTransition, animated } from 'react-spring';

export default function Routes() {
    const location = useLocation();
    const transitions = useTransition(location, {
        from: { opacity: 0, transform: 'translateY(50px)', position: 'absolute', },
        enter: { opacity: 1, transform: 'translateY(0)', position: 'absolute', },
        leave: { opacity: 0, transform: 'translateY(50px)', position: 'absolute', },
    });

    return transitions((props, item) => (
        <animated.div style={props}>
            <Switch location={item}>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts" component={PostsList} />
                <Route path="/posts/:id" component={Post} />
                <Route path="*" component={NotFound} />
            </Switch>
        </animated.div>
    ));
}