import React, { Component } from 'react';
import PropTypes from 'prop-types';
import designOptions from '../../models/designOptions';

import Scroller from '../common/Scroller';
import Accordion from '../common/Accordion';
import AccordionItem from '../common/Accordion/AccordionItem';
import DesignSettingsOption from './DesignSettingsOption';
import DesignSettingsSlider from './DesignSettingsSlider';
import DesignSettingsRadioList from './DesignSettingsRadioList';
import DesignSettingsCheckbox from './DesignSettingsCheckbox';
import DesignSettingsAttach from './DesignSettingsAttach';
import DesignSettingsSaveButton from './DesignSettingsSaveButton';
import DesignSettingsCloseButton from './DesignSettingsCloseButton';

export default class DesignSettings extends Component {
  static propTypes = {
    authUrl: PropTypes.string.isRequired,
    categoryPageUrl: PropTypes.string,
    changeImage: PropTypes.func.isRequired,
    changeOption: PropTypes.func.isRequired,
    closeDesignSettingsPopup: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    pageType: PropTypes.string.isRequired,
    productPageUrl: PropTypes.string,
    saveChanges: PropTypes.func.isRequired,
    unsavedFields: PropTypes.object.isRequired,
    tr: PropTypes.func.isRequired
  }
  getProps(property) {
    const { current, changeOption } = this.props;
    return {
      ...designOptions[property],
      value: current[property],
      onChange: changeOption.bind(this, property),
    };
  }
  getAttachProps(property) {
    const { current, changeImage } = this.props;
    return {
      ...designOptions[`${property}Url`],
      value: current[`${property}Url`],
      onChange: changeImage.bind(this, property),
    };
  }
  getAccordionItemProps(title) {
    return {
      title,
      bodyClassName: 'design-settings__group-content',
      className: 'design-settings__group',
      titleClassName: 'design-settings__group-header',
    };
  }
  onItemClick(idx, {itemKey, redirectUrl}) {
    this.props.onItemClick(itemKey, redirectUrl);
  }
  render() {
    const {
      authUrl,
      categoryPageUrl,
      closeDesignSettingsPopup,
      isSaving,
      pageType,
      productPageUrl,
      saveChanges,
      unsavedFields,
      tr
    } = this.props;

    return (
      <div className="design-settings">
        <header className="design-settings__header">
          <span>{tr('vendor.design_settings.title')}</span>
          <DesignSettingsCloseButton onClick={closeDesignSettingsPopup} />
        </header>
        <div className="design-settings__body">
          <Scroller className="design-settings__scroll" updateEvent="dsUpdate">
            <Accordion
              defaultSelectedKey="common"
              onItemClick={this.onItemClick.bind(this)}
              selectedKey={pageType}
              updateEvent="dsUpdate"
            >
              <AccordionItem
                {...this.getAccordionItemProps(tr('vendor.design_settings.main_page'))}
                itemKey="welcome"
                redirectUrl="/"
              >
                <DesignSettingsOption title={tr('vendor.design_settings.products_in_row')}>
                  <DesignSettingsRadioList {...this.getProps('mainPageProductsInRow')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.page_rows')}>
                  <DesignSettingsSlider {...this.getProps('mainPageRows')} displayValue />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.page_filter')}>
                  <DesignSettingsCheckbox {...this.getProps('mainPageFilter')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.page_slider')}>
                  <DesignSettingsCheckbox {...this.getProps('mainPageSlider')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.page_random')}>
                  <DesignSettingsCheckbox {...this.getProps('mainPageRandom')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps(tr('vendor.design_settings.category_page'))}
                itemKey="categories"
                isShow={categoryPageUrl !== null}
                redirectUrl={categoryPageUrl}
              >
                <DesignSettingsOption title={tr('vendor.design_settings.products_in_row')}>
                  <DesignSettingsRadioList {...this.getProps('categoryPageProductsInRow')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.page_rows')}>
                  <DesignSettingsSlider {...this.getProps('categoryPageRows')} displayValue/>
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.page_filter')}>
                  <DesignSettingsCheckbox {...this.getProps('categoryPageFilter')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps(tr('vendor.design_settings.product_page'))}
                isShow={productPageUrl !== null}
                itemKey="products"
                redirectUrl={productPageUrl}
              >
                <DesignSettingsOption title={tr('vendor.design_settings.page_photo')}>
                  <DesignSettingsRadioList {...this.getProps('productPagePhoto')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.similar_products')}>
                  <DesignSettingsCheckbox {...this.getProps('showSimilarProducts')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps(tr('vendor.design_settings.general_settings'))}
                itemKey="common"
              >
                <DesignSettingsOption inRow title={tr('vendor.design_settings.show_cart_button_in_list')}>
                  <DesignSettingsCheckbox {...this.getProps('showCartButtonInList')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.show_quantity_in_list')}>
                  <DesignSettingsCheckbox {...this.getProps('showQuantityInList')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.main_page_instagram')}>
                  <DesignSettingsCheckbox {...this.getProps('mainPageInstagram')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.main_page_banner')}>
                  <DesignSettingsCheckbox {...this.getProps('mainPageBanner')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title={tr('vendor.design_settings.walletone_widget')}>
                  <DesignSettingsCheckbox {...this.getProps('w1Widget')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem {...this.getAccordionItemProps(tr('vendor.design_settings.style'))}>
                <DesignSettingsOption title={tr('vendor.design_settings.logo')}>
                  <DesignSettingsAttach
                    {...this.getAttachProps('logo')}
                    className="design-settings__attach--image"
                    t={tr}
                  >
                    {(SelectFile) =>
                      <SelectFile className="select-file--icon select-file--icon-pencil" />
                    }
                  </DesignSettingsAttach>
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.page_bg')}>
                  <DesignSettingsAttach
                    {...this.getAttachProps('pageBg')}
                    className="design-settings__attach--image"
                    t={tr}
                  >
                    {(SelectFile) =>
                      <SelectFile className="select-file--icon select-file--icon-pencil" />
                    }
                  </DesignSettingsAttach>
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.page_bg_color')}>
                  <DesignSettingsRadioList {...this.getProps('pageBgColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.feed_bg_color')}>
                  <DesignSettingsRadioList {...this.getProps('feedBgColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.feed_transparency')}>
                  <DesignSettingsSlider {...this.getProps('feedTransparency')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.font_color')}>
                  <DesignSettingsRadioList {...this.getProps('fontColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.font_family')}>
                  <DesignSettingsRadioList {...this.getProps('fontFamily')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.font_size')}>
                  <DesignSettingsRadioList {...this.getProps('fontSize')} />
                </DesignSettingsOption>
                <DesignSettingsOption title={tr('vendor.design_settings.active_elements_color')}>
                  <DesignSettingsRadioList {...this.getProps('activeElementsColor')} />
                </DesignSettingsOption>
              </AccordionItem>
            </Accordion>
          </Scroller>
        </div>
        <div className="design-settings__footer">
          <DesignSettingsSaveButton
            isSaving={isSaving}
            onClick={saveChanges.bind(this, authUrl)}
            unsavedFields={unsavedFields}
            t={tr}
          />
        </div>
      </div>
    );
  }
}
