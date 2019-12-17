export function addCartTooltip(t) {
	return $('.b-btn-add-cart').tooltip({
    title: t('vendor.tooltip.added_to_cart'),
    trigger: 'click',
    placement: 'bottom',
    trigger: 'manual',
    template: '<div class="tooltip tooltip-btn-add-cart" role="tooltip"><div class="tooltip-inner"></div></div>'
  });	
}