/*global describe, before, it */
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import sinon from 'sinon';
import { expect } from 'chai';
import UserbarContainer from 'rc/Userbar';

describe('[Component] Userbar', function() {
  describe('with isDesignOpen = true', function() {
    before('render and locate element', function() {
      this.openDesignSettingsPopup = sinon.spy();
      this.renderedComponent = renderIntoDocument(
        <UserbarContainer
          designMode="open"
          designParamName="open_design"
          openDesignSettingsPopup={this.openDesignSettingsPopup}
          operatorUrl="http://google.ru/"
        />
      );
    });

    it('renders without errors', function() {
      expect(this.renderedComponent).to.be.an('object');
    });

    it('triggers openDesignSettingsPopup callback', function() {
      sinon.assert.calledOnce(this.openDesignSettingsPopup);
    });
  });

  describe('with isDesignOpen = false', function() {
    before('render and locate element', function() {
      this.openDesignSettingsPopup = sinon.spy();
      this.renderedComponent = renderIntoDocument(
        <UserbarContainer
          designMode="close"
          designParamName="open_design"
          openDesignSettingsPopup={this.openDesignSettingsPopup}
          operatorUrl="http://google.ru/"
        />
      );
    });

    it('renders without errors', function() {
      expect(this.renderedComponent).to.be.an('object');
    });

    it('doesn\'t triggers openDesignSettingsPopup callback', function() {
      sinon.assert.notCalled(this.openDesignSettingsPopup);
    });
  });
});
