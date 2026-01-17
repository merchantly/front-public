import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import ProductCardGallerySlider from '../../../../../app/scripts/react/components/Product/ProductCard/ProductCardGallerySlider';

describe('[Component] ProductCardGallerySlider', () => {
  it('should render without props', () => {
    expect( () => render(
      <ProductCardGallerySlider />
      )
    ).to.not.throw()
  });

  it('shouldn\'t render thumbnails when images < 2', () => {
    const images = [
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '7e22b5b1f521d86bc80d2c01a61b3adec1501d9e97d1a266592c6f9c49e5a806',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5300/image.png',
      },
    ];
    const wrapper = shallow(
      <ProductCardGallerySlider images={images} />
    );

    // Thumbnails are rendered in .b-slider_thumbs only when images.length > 1
    expect(wrapper.find('.b-slider_thumbs').exists()).to.be.false;
  });

  it('should render thumbnails when images >= 2', () => {
    const images = [
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '7e22b5b1f521d86bc80d2c01a61b3adec1501d9e97d1a266592c6f9c49e5a806',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5300/image.png',
      },
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '3d74d4dcde4cb820bc288b4f2956c81f2464d2b22c27fb8abdcd9a5589b4d769',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/26264/450123b4-7c9e-4ae9-a04e-05fda504d0a2.jpg',
      }
    ];
    const wrapper = shallow(
      <ProductCardGallerySlider images={images} />
    );

    expect(wrapper.find('.b-slider_thumbs').exists()).to.be.true;
  });

  it('should update selected index when emitted "photo change" event and uid found', () => {
    const images = [
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '7e22b5b1f521d86bc80d2c01a61b3adec1501d9e97d1a266592c6f9c49e5a806',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5300/image.png',
      },
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '3d74d4dcde4cb820bc288b4f2956c81f2464d2b22c27fb8abdcd9a5589b4d769',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/26264/450123b4-7c9e-4ae9-a04e-05fda504d0a2.jpg',
      }
    ];
    const wrapper = shallow(
      <ProductCardGallerySlider images={images} selectedImage={images[1]} />
    );

    expect(wrapper.state('selectedIndex')).to.equal(1);
  });

  it('shouldn\'t update selected index when emitted "photo change" event and uid not found', () => {
    const nonexistentImage = {
      title: null,
      uid: '123',
      url: 'http://google.ru',
    };
    const images = [
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '7e22b5b1f521d86bc80d2c01a61b3adec1501d9e97d1a266592c6f9c49e5a806',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5300/image.png',
      },
      {
        title: 'Миникольцо Полоски без камней черненое',
        uid: '3d74d4dcde4cb820bc288b4f2956c81f2464d2b22c27fb8abdcd9a5589b4d769',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/26264/450123b4-7c9e-4ae9-a04e-05fda504d0a2.jpg',
      }
    ];
    const wrapper = shallow(
      <ProductCardGallerySlider images={images} selectedImage={nonexistentImage} />
    );

    expect(wrapper.state('selectedIndex')).to.equal(0);
  });
});
