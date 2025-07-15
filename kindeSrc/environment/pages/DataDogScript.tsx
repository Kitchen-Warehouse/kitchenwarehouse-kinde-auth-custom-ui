'use client';

import { useEffect } from 'react';
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

interface KindeUser {
  id: string;
  email: string;
  given_name?: string;
  family_name?: string;
}

export const DataDogScript = () => {
  useEffect(() => {
    try {
      // regex patterns to identify known bot instances:
      const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";

      const botRegex = new RegExp(botPattern, 'i');

      // define var conditionalSampleRate as 0 if the userAgent matches a pattern in botPatterns
      // otherwise, define conditionalSampleRate as 100
      const conditionalSampleRate = botRegex.test(navigator.userAgent) ? 0 : 100;
      const environment = process.env.NEXT_PUBLIC_AP_ENVIRONMENT ?? 'development';

      // — RUM & Session Replay —
      datadogRum.init({
        applicationId: '96e53e32-a38c-4243-bd71-0dfe100cdb32',
        clientToken: 'pub2326474ce259662296128736d3da47ba',
        site: 'ap1.datadoghq.com',
        service: 'kwh-kinde-web',
        env: environment,
        version: process.env.NEXT_PUBLIC_APP_VERSION,
        sessionSampleRate: conditionalSampleRate, // capture 100% of sessions
        sessionReplaySampleRate: conditionalSampleRate, // record 100% as Session Replay
        startSessionReplayRecordingManually: true,
        defaultPrivacyLevel: 'mask-user-input',
        // Custom context for Kinde auth
        beforeSend: (event) => {
          // Add custom context for auth events
          if (event.type === 'action' || event.type === 'view') {
            event.context = {
              ...event.context,
              auth_page: window.location.pathname,
              auth_provider: 'kinde',
            };
          }
          return true;
        },
      });

      if (process.env.NEXT_PUBLIC_ENABLE_FULL_SCREEN_REPLAY === 'true') {
        datadogRum.startSessionReplayRecording();
      }

      // — Logs SDK —
      datadogLogs.init({
        clientToken: 'pub2326474ce259662296128736d3da47ba',
        site: 'ap1.datadoghq.com',
        service: 'kwh-kinde-web',
        env: environment,
        forwardErrorsToLogs: true,
        forwardConsoleLogs: 'all',
        forwardReports: 'all',
      });

      // — Forward all console.* to Datadog Logs —
      (function patchConsole() {
        const levels = ['debug', 'info', 'warn', 'error'] as const;
        const originals: Partial<Record<(typeof levels)[number], (...args: unknown[]) => void>> = {};
        levels.forEach((level) => {
          originals[level] = console[level];
          console[level] = (...args: unknown[]) => {
            // join args into a string; you can adjust to send structured data too
            datadogLogs.logger[level](args.map(String).join(' '));
            if (environment === 'development' || level === 'error') {
              originals[level]?.apply(console, args);
            }
          };
        });
      })();

      // Set user information when available
      const setUserInfo = (user: KindeUser) => {
        if (user) {
          datadogRum.setUser({
            id: user.id,
            name: user.given_name && user.family_name 
              ? `${user.given_name} ${user.family_name}` 
              : user.email,
            email: user.email,
          });
        }
      };

      // Listen for user authentication events
      const handleUserEvent = (event: Event) => {
        try {
          const customEvent = event as CustomEvent;
          if (customEvent && customEvent.detail && customEvent.detail.user) {
            setUserInfo(customEvent.detail.user as KindeUser);
          }
        } catch (error) {
          console.error('Error handling user event in DataDog:', error);
        }
      };

      // Listen for Kinde auth events
      window.addEventListener('kinde:user:authenticated', handleUserEvent);
      window.addEventListener('kinde:user:profile_updated', handleUserEvent);

      // Cleanup event listeners
      return () => {
        window.removeEventListener('kinde:user:authenticated', handleUserEvent);
        window.removeEventListener('kinde:user:profile_updated', handleUserEvent);
      };

    } catch (error) {
      console.error('Error initializing DataDog:', error);
      
      // Log to DataDog if it's already initialized
      try {
        if (datadogLogs.logger) {
          datadogLogs.logger.error('DataDog initialization failed', {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
          });
        }
      } catch (logError) {
        console.error('Failed to log DataDog error to DataDog:', logError);
      }
    }
  }, []);

  return null;
};

export default DataDogScript; 