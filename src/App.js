import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import  {Heading, GridItem} from '@chakra-ui/react'

import Layout from './Components/Layout/Layout';
import LoginForm from './Components/Auth/LoginForm'
import ConfirmForm from './Components/Auth/ConfirmForm';
import PrivateRoute from './Components/Route/PrivateRoute';
import DashBoard from './Components/Dashboard/DashBoard';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path='/'>
            <DashBoard/>
          </PrivateRoute>
          <Route path='/login'>
            <LoginForm/>
          </Route>
         <Route path="/confirm">
           <ConfirmForm/>
         </Route>
         <Route>
          <GridItem colStart={[1, null, null, 2, null, null]} colSpan={[3, null, null, 1, null, null]} p={6}>
              <Heading as='h1' mb={6}>
                404: Page Not Found!
                </Heading>
          </GridItem>
         </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
