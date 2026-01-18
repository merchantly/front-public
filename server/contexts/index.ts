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
  useCurrency,
  useNumberSettings,
  useDesign,
  useAccountingSettings,
  withConfig,
} from './ConfigContext';

export type { AppConfig, SsrContext } from './ConfigContext';
