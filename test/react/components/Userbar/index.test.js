/*global describe, before, after, it */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import UserbarContainer from 'rc/Userbar';
import * as PopupActions from 'r/actions/PopupActions';
import {
  userState,
} from 'scripts/routes/api';
import { initStore } from 'test/mocks/redux';

describe('[Component] UserbarContainer', function() {
  before('instantiate spy', function() {
      this.openDesignSettingsPopup = sinon.spy(PopupActions, 'openDesignSettingsPopup');
  });

  describe('with designMode == "open"', function() {
    before('render and locate element', function() {
      global.redux = initStore();
      this.server = sinon.fakeServer.create();
      this.server.respondWith('GET', userState(), [
        200,
        { 'Content-Type': 'application/json' },
        '{ "designMode": "open" }',
      ]);

      this.renderedComponent = mount(
        <UserbarContainer operatorUrl="http://google.ru/" />
      );
      this.server.respond();
    });

    after('restore fakeServer state', function() {
      this.server.restore();
      this.openDesignSettingsPopup.reset();
    });

    it('renders without errors', function() {
      expect(this.renderedComponent).to.be.an('object');
    });

    it('triggers openDesignSettingsPopup callback', function() {
      sinon.assert.calledOnce(this.openDesignSettingsPopup);
    });
  });

  describe('with designMode == "close"', function() {
    before('render and locate element', function() {
      global.redux = initStore();
      this.server = sinon.fakeServer.create();
      this.server.respondWith('GET', userState(), [
        200,
        { 'Content-Type': 'application/json' },
        '{ "designMode": "close" }',
      ]);

      this.renderedComponent = mount(
        <UserbarContainer operatorUrl="http://google.ru/" />
      );
      this.server.respond();
    });

    after('restore fakeServer state', function() {
      this.server.restore();
      this.openDesignSettingsPopup.reset();
    });

    it('renders without errors', function() {
      expect(this.renderedComponent).to.be.an('object');
    });

    it('doesn\'t triggers openDesignSettingsPopup callback', function() {
      sinon.assert.notCalled(this.openDesignSettingsPopup);
    });
  });
});
