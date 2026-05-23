import { expect } from 'chai';
import { catalogFilterPreviewRule } from '../../../../app/scripts/react/components/DesignPreview';

describe('[Component] DesignPreview', function() {
  describe('catalogFilterPreviewRule', function() {
    it('hides filter and resets list layout when filter switch is off', function() {
      const rules = catalogFilterPreviewRule(false);

      expect(rules).to.have.property('.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__filter');
      expect(rules).to.have.property('.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__filter-container');
      expect(rules['.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__filter']).to.deep.equal({ display: 'none' });
      expect(rules['.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__filter-container']).to.deep.equal({ display: 'none' });
      expect(rules['.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__content']).to.deep.equal({ 'margin-left': '-18px' });
      expect(rules['.b-page .b-item-list_catalog.b-item-list--with-filter .b-item-list__description']).to.deep.equal({ 'margin-left': '6px' });
    });

    it('does not force a filter to appear when filter switch is on', function() {
      expect(catalogFilterPreviewRule(true)).to.deep.equal({});
    });
  });
});
