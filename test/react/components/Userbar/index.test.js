/*global describe, it, xit */
import { render } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import UserbarContainer from 'rc/Userbar';
import { initStore } from 'test/mocks/redux';

describe('[Component] UserbarContainer', function() {
  describe('with designMode == "open"', function() {
    it('renders without errors', function() {
      global.redux = initStore();
      expect(
        () => render(
          <UserbarContainer operatorUrl="http://google.ru/" />
        )
      ).to.not.throw()
    });

    xit('triggers openDesignSettingsPopup callback', function() {
      // Skipped: requires mount() which is incompatible with React 18
    });
  });

  describe('with designMode == "close"', function() {
    it('renders without errors', function() {
      global.redux = initStore();
      expect(
        () => render(
          <UserbarContainer operatorUrl="http://google.ru/" />
        )
      ).to.not.throw()
    });

    xit('doesn\'t triggers openDesignSettingsPopup callback', function() {
      // Skipped: requires mount() which is incompatible with React 18
    });
  });
});
