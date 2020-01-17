export function addCartTooltip($button, t) {
	return $button.tooltip({
    title: t('vendor.tooltip.added_to_cart'),
    trigger: 'click',
    placement: 'bottom',
    trigger: 'manual',
    template: '<div class="tooltip tooltip-btn-add-cart" role="tooltip"><div class="tooltip-inner"></div></div>'
  });	
}