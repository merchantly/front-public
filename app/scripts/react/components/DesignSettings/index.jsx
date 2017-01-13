import React, { Component, PropTypes } from 'react';
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
    } = this.props;

    return (
      <div className="design-settings">
        <header className="design-settings__header">
          <span>Управление дизайном</span>
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
                {...this.getAccordionItemProps('Главная страница')}
                itemKey="welcome"
                redirectUrl="/"
              >
                <DesignSettingsOption title="Товаров в ряд">
                  <DesignSettingsRadioList {...this.getProps('mainPageProductsInRow')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Строк товаров">
                  <DesignSettingsSlider {...this.getProps('mainPageRows')} displayValue />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Фильтр товаров слева">
                  <DesignSettingsCheckbox {...this.getProps('mainPageFilter')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Слайдер посередине">
                  <DesignSettingsCheckbox {...this.getProps('mainPageSlider')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Товары в случайном порядке">
                  <DesignSettingsCheckbox {...this.getProps('mainPageRandom')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps('Страница категории')}
                itemKey="categories"
                isShow={categoryPageUrl !== null}
                redirectUrl={categoryPageUrl}
              >
                <DesignSettingsOption title="Товаров в ряд">
                  <DesignSettingsRadioList {...this.getProps('categoryPageProductsInRow')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Строк товаров">
                  <DesignSettingsSlider {...this.getProps('categoryPageRows')} displayValue/>
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Фильтр товаров слева">
                  <DesignSettingsCheckbox {...this.getProps('categoryPageFilter')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps('Страница товара')}
                isShow={productPageUrl !== null}
                itemKey="products"
                redirectUrl={productPageUrl}
              >
                <DesignSettingsOption title="Расположение фото">
                  <DesignSettingsRadioList {...this.getProps('productPagePhoto')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Подобные товары снизу">
                  <DesignSettingsCheckbox {...this.getProps('showSimilarProducts')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem
                {...this.getAccordionItemProps('Общие настройки')}
                itemKey="common"
              >
                <DesignSettingsOption inRow title="Галерея Instagram снизу">
                  <DesignSettingsCheckbox {...this.getProps('mainPageInstagram')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Баннер сверху">
                  <DesignSettingsCheckbox {...this.getProps('mainPageBanner')} />
                </DesignSettingsOption>
                <DesignSettingsOption inRow title="Виджет W1 снизу">
                  <DesignSettingsCheckbox {...this.getProps('w1Widget')} />
                </DesignSettingsOption>
              </AccordionItem>

              <AccordionItem {...this.getAccordionItemProps('Стиль')}>
                <DesignSettingsOption title="Логотип (желательно .SVG)">
                  <DesignSettingsAttach
                    {...this.getAttachProps('logo')}
                    className="design-settings__attach--image"
                  >
                    {(SelectFile) =>
                      <SelectFile className="select-file--icon select-file--icon-pencil" />
                    }
                  </DesignSettingsAttach>
                </DesignSettingsOption>
                <DesignSettingsOption title="Фон страницы">
                  <DesignSettingsAttach
                    {...this.getAttachProps('pageBg')}
                    className="design-settings__attach--image"
                  >
                    {(SelectFile) =>
                      <SelectFile className="select-file--icon select-file--icon-pencil" />
                    }
                  </DesignSettingsAttach>
                </DesignSettingsOption>
                <DesignSettingsOption title="Цвет страницы">
                  <DesignSettingsRadioList {...this.getProps('pageBgColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Цвет контента">
                  <DesignSettingsRadioList {...this.getProps('feedBgColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Прозрачность ленты">
                  <DesignSettingsSlider {...this.getProps('feedTransparency')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Цвет текста">
                  <DesignSettingsRadioList {...this.getProps('fontColor')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Шрифт">
                  <DesignSettingsRadioList {...this.getProps('fontFamily')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Размер шрифта">
                  <DesignSettingsRadioList {...this.getProps('fontSize')} />
                </DesignSettingsOption>
                <DesignSettingsOption title="Цвет активных элементов">
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
          />
        </div>
      </div>
    );
  }
}
