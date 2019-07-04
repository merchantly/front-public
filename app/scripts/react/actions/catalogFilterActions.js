import Api from '../api/api';
import NoticeService from '../services/Notice';

export function showFilteredCount(filter, t) {
  NoticeService.notifyInfo('Загрузка...');

  Api.catalogFilter.getFilteredCount(filter)
    .then((count) => {
      NoticeService.notifyInfo(
        (<span>
          {t('vendor.notice.catalog_filter.selected_products')}:
          {` ${count} `}
          <a href={`?${filter}`}>
            {t('vendor.notice.catalog_filter.show_products')}
          </a>
        </span>),
        300000,
        () => {
          window.location.href = `\?${filter}`
        }
      )
    })
    .fail(NoticeService.errorResponse);
}