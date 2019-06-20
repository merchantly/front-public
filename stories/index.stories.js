import React from 'react';

import { storiesOf } from '@storybook/react';

import 'app/scripts/libs';
import 'app/scripts/resources/gon';
import 'app/scripts/bundle';
import 'react_ujs';

import 'app/stylesheets/local.scss';
import { layoutProps } from 'test/fixtures/vendorLayout/sample.json';


import WelcomePage from 'app/scripts/react/components/Welcome/WelcomePage';
import WelcomeChildrenPage from 'app/scripts/react/components/WelcomeChildren/WelcomeChildrenPage';
storiesOf('Welcome page', module)
  .add('WelcomePage', () => <WelcomePage {...require('test/fixtures/welcome/page-sample.json')}/>)
  .add('WelcomeChildrenPage', () => <WelcomeChildrenPage {...require('test/fixtures/welcomeChildren/page-sample.json')}/> );

import ErrorPage from 'app/scripts/react/components/ErrorPage/ErrorPagePage';
storiesOf('Other pages', module)
  .add('NotFound', () => <ErrorPage {...require('test/fixtures/errorPage/page-sample.json')} /> )


import ClientRegistrationPage from 'app/scripts/react/components/ClientRegistration/ClientRegistrationPage';
import ClientResetPasswordPage from 'app/scripts/react/components/ClientResetPassword/ClientResetPasswordPage';
import ClientSessionNewPage from 'app/scripts/react/components/ClientSessionNew/ClientSessionNewPage';
import CabinetPage from 'app/scripts/react/components/Cabinet/CabinetPage';

storiesOf('Client pages',module)
  .add('ClientRegistrationPage', () => <ClientRegistrationPage {...require('test/fixtures/clientRegistration/page-sample.json')} /> )
  .add('ClientResetPasswordPage', () => <ClientResetPasswordPage {...require('test/fixtures/clientResetPasswordPage/page-sample.json')} /> )
  .add('ClientSessionNewPage', () => <ClientSessionNewPage {...require('test/fixtures/clientSessionNew/page-sample.json')} /> )
  .add('CabinetPage', () => <CabinetPage {...require('test/fixtures/cabinet/page-sample.json')} /> )


import ContentPage from 'app/scripts/react/components/ContentPage/ContentPage'
import ContentPagePage from 'app/scripts/react/components/ContentPage/ContentPage'
import BlogPostPage from 'app/scripts/react/components/BlogPost/BlogPostPage'
import BlogPostListPage from 'app/scripts/react/components/BlogPostList/BlogPostListPage'
import LookbookPage from 'app/scripts/react/components/Lookbook/LookbookPage'

storiesOf('Content pages', module)
  .add('ContentPage', () => <ContentPage {...require('test/fixtures/contentPage/sample.json')} /> )
  .add('ContentPagePage', () => <ContentPagePage {...require('test/fixtures/contentPage/page-sample.json')} /> )
  .add('BlogPostPage', () => <BlogPostPage {...require('test/fixtures/blogPost/page-sample.json')} /> )
  .add('BlogPostListPage', () => <BlogPostListPage {...require('test/fixtures/blogPostList/page-sample.json')} /> )
  .add('LookbookPage', () => <LookbookPage { ...Object.assign({'layoutProps': layoutProps}, require('test/fixtures/lookbook/sample.json'))} /> )

// Product pages
// Order pages
// Catalog pages
//
