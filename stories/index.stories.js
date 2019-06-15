import React from 'react';

import { storiesOf } from '@storybook/react';

import 'app/scripts/libs';
import 'app/scripts/resources/gon';
import 'app/scripts/bundle';
import 'react_ujs';

import 'app/stylesheets/local.scss';

import WelcomePage from 'app/scripts/react/components/Welcome/WelcomePage';
import WelcomeChildrenPage from 'app/scripts/react/components/WelcomeChildren/WelcomeChildrenPage';

storiesOf('Welcome page', module)
  .add('WelcomePage', () => <WelcomePage {...require('test/fixtures/welcome/page-sample.json')}/>)
  .add('WelcomeChildrenPage', () => <WelcomeChildrenPage {...require('test/fixtures/welcomeChildren/page-sample.json')}/> );

import ErrorPage from 'app/scripts/react/components/ErrorPage/ErrorPagePage';
storiesOf('Other pages', module)
  .add('NotFound', () => <ErrorPage {...require('test/fixtures/errorPage/page-sample.json')} /> )
