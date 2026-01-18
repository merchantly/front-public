/**
 * Server Contexts
 *
 * Экспорт всех React контекстов для SSR.
 */

export {
  ConfigProvider,
  ConfigContext,
  useConfig,
  useVendor,
  useLocale,
  useTranslations,
  useCurrency,
  useNumberSettings,
  useAccountingSettings,
  withConfig,
} from './ConfigContext';

export type { AppConfig, SsrContext } from './ConfigContext';
