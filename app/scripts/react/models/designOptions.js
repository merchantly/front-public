import * as designTypes from '../constants/designTypes';

function designOptions(tr) {
  return {
    mainPageProductsInRow: {
      type: designTypes.DESIGN_ANY_TYPE,
      name: 'designoption-mainPageProductsInRow',
      items: [
        { title: tr('vendor.design_settings.in_row_count.one'), value: 1 },
        { title: tr('vendor.design_settings.in_row_count.two'), value: 2 },
        { title: tr('vendor.design_settings.in_row_count.three'), value: 3 },
        { title: tr('vendor.design_settings.in_row_count.four'), value: 4 },
      ],
    },
    mainPageRows: {
      type: designTypes.DESIGN_SLIDER_TYPE,
        name: 'designoption-mainPageRows',
        from: 1,
        to: 100,
        step: 1,
    },
    mainPageInstagram: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-mainPageInstagram',
    },
    mainPageSlider: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-mainPageSlider',
    },
    mainPageBanner: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-mainPageBanner',
    },
    mainPageFilter: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-mainPageFilter',
    },
    mainPageOrdered: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-mainPageOrdered',
    },
    categoryPageProductsInRow: {
      type: designTypes.DESIGN_ANY_TYPE,
      name: 'designoption-categoryPageProductsInRow',
      items: [
        { title: tr('vendor.design_settings.in_row_count.one'), value: 1 },
        { title: tr('vendor.design_settings.in_row_count.two'), value: 2 },
        { title: tr('vendor.design_settings.in_row_count.three'), value: 3 },
        { title: tr('vendor.design_settings.in_row_count.four'), value: 4 },
      ],
    },
    categoryPageRows: {
      type: designTypes.DESIGN_SLIDER_TYPE,
        name: 'designoption-categoryPageRows',
        from: 1,
        to: 100,
        step: 1,
    },
    categoryPageFilter: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-categoryPageFilter',
    },
    productPagePhoto: {
      type: designTypes.DESIGN_RADIO_TYPE,
        name: 'designoption-productPagePhoto',
        items: [{
        title: tr('vendor.design_settings.product_page_photo.above'),
        value: 'above',
      }, {
        title: tr('vendor.design_settings.product_page_photo.aside'),
        value: 'aside',
      }],
    },
    showSimilarProducts: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-showSimilarProducts',
    },
    // productPageSimilarProducts: {
    //   type: designTypes.DESIGN_RADIO_TYPE,
    //   name: 'designoption-productPageSimilarProducts',
    //   items: [{
    //     title: 'Нет',
    //     value: 'off',
    //   }, {
    //     title: 'Установленные',
    //     value: 'product',
    //   }, {
    //     title: 'Авто',
    //     value: 'on',
    //   },],
    // },
    wOneWidget: {
      type: designTypes.DESIGN_CHECKBOX_TYPE,
        name: 'designoption-wOneWidget',
    },
    logoUrl: {
      type: designTypes.DESIGN_ATTACHMENT_TYPE,
        name: 'designoption-logoUrl',
    },
    pageBgUrl: {
      type: designTypes.DESIGN_ATTACHMENT_TYPE,
        name: 'designoption-pageBgUrl',
    },
    pageBgColor: {
      type: designTypes.DESIGN_COLOR_TYPE,
        name: 'designoption-pageBgColor',
        items: [{
        title: tr('vendor.design_settings.colors.white'),
        value: '#ffffff',
      }, {
        title: tr('vendor.design_settings.colors.black'),
        value: '#000000',
      }, {
        title: tr('vendor.design_settings.colors.orange'),
        value: '#e74c3c',
      }, {
        title: tr('vendor.design_settings.colors.grey'),
        value: '#6c7a89',
      }, {
        title: tr('vendor.design_settings.colors.grey'),
        value: '#f4d3c4',
      }],
    },
    feedBgColor: {
      type: designTypes.DESIGN_COLOR_TYPE,
        name: 'designoption-feedBgColor',
        items: [{
        title: tr('vendor.design_settings.colors.white'),
        value: '#ffffff',
      }, {
        title: tr('vendor.design_settings.colors.black'),
        value: '#000000',
      }, {
        title: tr('vendor.design_settings.colors.light_green'),
        value: '#2ac67e',
      }, {
        title: tr('vendor.design_settings.colors.orange'),
        value: '#e74c3c',
      }, {
        title: tr('vendor.design_settings.colors.grey'),
        value: '#c6c9cc',
      }],
    },
    feedTransparency: {
      type: designTypes.DESIGN_SLIDER_TYPE,
        name: 'designoption-feedTransparency',
        from: 0,
        to: 1,
        step: .01,
    },
    fontColor: {
      type: designTypes.DESIGN_COLOR_TYPE,
        name: 'designoption-fontColor',
        items: [{
        title: tr('vendor.design_settings.colors.white'),
        value: '#ffffff',
      }, {
        title: tr('vendor.design_settings.colors.black'),
        value: '#000000',
      }, {
        title: tr('vendor.design_settings.colors.light_green'),
        value: '#2ac67e',
      }, {
        title: tr('vendor.design_settings.colors.red'),
        value: '#e74c3c',
      }, {
        title: tr('vendor.design_settings.colors.grey'),
        value: '#c6c9cc',
      }],
    },
    fontFamily: {
      type: designTypes.DESIGN_FONT_TYPE,
        name: 'designoption-fontfamily',
        items: [{
        title: 'Helvetica',
        value: 'helvetica',
      }, {
        title: 'PT Serif',
        value: 'ptserif',
      }, {
        title: 'PT Sans',
        value: 'ptsans',
      }, {
        title: 'Gotham Pro',
        value: 'gotham',
      }, {
        title: 'Lora',
        value: 'lora',
      }],
    },
    fontSize: {
      type: designTypes.DESIGN_FONT_SIZE_TYPE,
        name: 'designoption-fontsize',
        items: [{
        title: tr('vendor.design_settings.dimensions.sm'),
        value: 'sm',
      }, {
        title: tr('vendor.design_settings.dimensions.md'),
        value: 'md',
      }, {
        title: tr('vendor.design_settings.dimensions.lg'),
        value: 'lg',
      }],
    },
    activeElementsColor: {
      type: designTypes.DESIGN_COLOR_TYPE,
        name: 'designoption-activeElementsColor',
        items: [{
        title: tr('vendor.design_settings.colors.white'),
        value: '#ffffff',
      }, {
        title: tr('vendor.design_settings.colors.black'),
        value: '#000000',
      }, {
        title: tr('vendor.design_settings.colors.orange'),
        value: '#e74c3c',
      }, {
        title: tr('vendor.design_settings.colors.grey'),
        value: '#6c7a89',
      }, {
        title: tr('vendor.design_settings.colors.beige'),
        value: '#f4d3c4',
      }],
    },
  }
}

export default designOptions;
