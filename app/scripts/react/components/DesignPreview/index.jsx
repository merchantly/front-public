import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import jss from 'jss';
import nested from 'jss-nested';
import tinycolor from 'tinycolor2';
import connectToRedux from '../HoC/connectToRedux';
import { any } from 'lodash';

jss.use(nested);

const _rules = {
  welcome: {
    mainPageRows(value, { mainPageProductsInRow }) {
      const newValue = (value * mainPageProductsInRow) + 1;

      return {
        ['.b-page .b-item-list_catalog .b-item-list__item:nth-child(n + ' + newValue + ')']: {
          display: 'none',
        },
      };
    },
  },
  categories: {
    categoryPageRows(value, { categoryPageProductsInRow }) {
      const newValue = (value * categoryPageProductsInRow) + 1;

      return {
        ['.b-page .b-item-list_catalog .b-item-list__item:nth-child(n + ' + newValue + ')']: {
          display: 'none',
        },
      };
    },
  },
  common: {
    pageBgColor(value) {
      return {
        '.b-page': {
          'background-color': value,
        },
      };
    },
    pageBgUrl(value) {
      return {
        '.b-page': {
          'background-image': value ? `url("${value}")` : 'none',
        },
      };
    },
    feedBgColor(value) {
      return {
        dep: 'feedTransparency',
        rule(depValue) {
          return {
            '.b-page__content__inner, .sticky-active .b-nav': {
              'background-color': tinycolor(value).setAlpha(1 - depValue).toRgbString(),
            },
          };
        },
      };
    },
    fontColor(value) {
      return {
        '.b-page': {
          'color': value,
        },
      };
    },
    activeElementsColor(value) {
      const color = tinycolor(value);
      return {
        '.b-page': {
          '& .Icon--active:before': {
            'color': color.toRgbString(),
          },
          '& .element--active': {
            'background-color': color.toRgbString(),
          },
          '& .element--active-opacity': {
            'background-color': color.setAlpha(.8).toRgbString(),
          },
          '& .element--active-opacity:hover': {
            'background-color': color.setAlpha(.7).toRgbString(),
          },
        },
      };
    },
  },
};
const _states = {
  welcome: {
    mainPageProductsInRow: 'b-page_cols',
  },
  categories: {
    categoryPageProductsInRow: 'b-page_cols',
  },
  products: {
    productPagePhoto: 'b-page_layout-photo',
    showSimilarProducts: 'b-page_layout-similar-products',
    // productPageSimilarProducts: 'b-page_layout-similar-products',
  },
  common: {
    fontFamily: 'b-page_ff',
    fontSize: 'b-page_fs',
  },
};
const _switchableStates = {
  welcome: {
    mainPageFilter: 'b-page_layout-filter',
    mainPageSlider: 'b-page_layout-slider',
  },
  categories: {
    categoryPageFilter: 'b-page_layout-filter',
  },
  common: {
    w1Widget: 'b-page_layout-w1widget',
    mainPageBanner: 'b-page_layout-banner',
    mainPageInstagram: 'b-page_layout-instagram',
  },
};

@connect((state) => ({
  design: state.design,
  popups: state.popup.popups,
}))
class DesignPreview extends Component {
  static propTypes = {
    design: PropTypes.object.isRequired,
    pageType: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.attachSheet();
    if (this.isPopupOpened(this.props)) {
      this.apply(this.props.design.get('current'));
    }
  }
  componentWillUpdate(nextProps) {
    this.reattachSheet();
    this.apply(nextProps.design.get('current'));
  }
  componentWillUnmount() {
    this.sheet.detach();
    this.sheet = null;
  }
  isPopupOpened(props) {
    return any(props.popups, (popup) => (
      popup.style === 'DesignSettings'
    ));
  }
  attachSheet() {
    this.sheet = jss.createStyleSheet({}, { named: false }).attach();
    this.sheet.element.setAttribute('design-settings-sheet', '');
  }
  reattachSheet() {
    this.sheet.detach();
    this.attachSheet();
  }
  apply(design) {
    const { pageType } = this.props;
    const statesValues = this.getStatesValues(design, _states, pageType);
    const switchableStatesValues = this.getStatesValues(design, _switchableStates, pageType);
    const pageClasses = this.getPageClasses(design, { ...statesValues, ...switchableStatesValues });
    const cssRules = this.getRules(design, pageType);
    const page = this.getElements().page;

    this.sheet.addRules(cssRules);
    page.className = pageClasses.join(' ');
    this.emitChangeEvents();
  }
  getStatesValues(design, states, pageType) {
    const statesForPageType = this.getStatesByPageType(states, pageType);
    return design.reduce((previous, value, property) => {
      const state = statesForPageType[property];
      if (state) {
        previous[state] = value;
      }
      return previous;
    }, {});
  }
  getStatesByPageType(states, pageType) {
    return {
      ...states.common,
      ...states[pageType],
    };
  }
  getRulesByPageType(rules, pageType) {
    return {
      ...rules.common,
      ...rules[pageType],
    };
  }
  getRules(design, pageType) {
    const rulesForPageType = this.getRulesByPageType(_rules, pageType);
    return design.reduce((previous, value, property) => {
      const rule = rulesForPageType[property];
      if (rule) {
        const cssRule = rule(value, design.toJS());
        if (cssRule.dep) {
          const depValue = design.get(cssRule.dep);
          previous = previous.mergeDeep(cssRule.rule(depValue));
        } else {
          previous = previous.mergeDeep(cssRule);
        }
      }
      return previous;
    }, fromJS({})).toJS();
  }
  getPageClasses(design, states) {
    const page = this.getElements().page;
    let classes = page.className.split(' ').filter((className) => {
      for (let key in states) {
        if (states.hasOwnProperty(key)) {
          if (className.indexOf(key) === 0) return false;
        }
      }
      return true;
    });

    Object.keys(states).reduce(function(previous, key) {
      if (states.hasOwnProperty(key)) {
        const value = states[key];
        if (value) {
          previous.push(value !== true ? key + '-' + value : key);
        }
      }
      return previous;
    }, classes);

    return classes;
  }
  getElements() {
    return {
      page: document.body || document.getElementsByTagName('body')[0],
    };
  }
  emitChangeEvents() {
    $(document).trigger('updateProductImages');
  }
  render() {
    return null;
  }
}

export default connectToRedux(DesignPreview);
