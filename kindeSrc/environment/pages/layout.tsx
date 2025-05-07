'use server';

import {
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getFallbackFaviconUrl,
  getSVGFaviconUrl,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';

interface LayoutProps extends KindePageEvent {
  children: React.ReactNode;
  props: {
    logo?: string;
    helpText?: string;
    helpNumber?: string;
    paymentLogos?: { name: string; paymentImageUrl: string }[];
  };
}

export const Layout = ({
  request,
  context,
  children,
  props,
}: LayoutProps): React.JSX.Element => {
  const { logo, helpText, helpNumber, paymentLogos } = props ?? {};
  return (
    <html lang={request.locale.lang}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='robots' content='noindex' />
        <meta name='csrf-token' content={getKindeCSRF()} />
        <title>{context.widget.content.pageTitle}</title>
        <link rel="icon" href={getFallbackFaviconUrl()} sizes="48x48" />
        <link rel="icon" href={getSVGFaviconUrl()} type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style nonce={getKindeNonce()}>
          {`
              .header-container {
                padding: 1rem 2rem;
              }

              .header-content {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0;
                @media screen and (max-width: 1275px) {
                  padding: 0.25rem 0;
                }
              }

              .secure-login-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
              }

              .secure-login {
                font-family: Inter, sans-serif;
                color: #666666;
                font-size: 0.875rem;
                line-height: 1.25rem;
                letter-spacing: -0.14px;
                margin: 0;
                font-weight: 600;
              }

              .content-container {
                display: flex;
                align-items: center;
                margin: 0 auto;
                max-width: 1440px;
                flex: 1 0 0;
              }

              .container {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                width: 100%;
                justify-content: center;
                gap: 3rem;
                align-items: center;
                @media screen and (max-width: 1275px) {
                  grid-template-columns: repeat(1, minmax(0, 1fr));
                  padding: 20px;
                }
              }

              .back-to-site {
                display: flex;
                gap: 4px;
                color: #1a1a1a;
                text-decoration: none;
                font-weight: 600;
              }

              .login-form-wrapper {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 20px;
                justify-content: center;
                align-items: center;
                flex: 1 0 0;
              }

              .signInFormTextTopText,
              .signupFormTextTopText,
              .signInFormTextBottomText,
              .signupFormTextBottom {
                color: #1a1a1a;
                font-family: Inter, sans-serif;
                hr {
                  margin: 20px 0;
                  border-color: #e6e6e6;
                }

                &.space-y {
                  ul > li {
                    margin-top: 16px;
                  }
                }

                a {
                  text-decoration: underline;
                }

                h4,
                h5,
                h6,
                p,
                div,
                ul,
                blockquote {
                  margin-top: 16px;
                }

                h1,
                h2 {
                  margin-top: 56px;
                }

                h1:first-child,
                h2:first-child,
                h3:first-child,
                h4:first-child,
                h5:first-child,
                h6:first-child,
                p:first-child,
                div:first-child,
                ul:first-child,
                blockquote:first-child,
                a:first-child {
                  margin-top: 0;
                }

                h1,
                h1 a {
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 1.875rem;
                  font-weight: 600;
                  line-height: 1.9375rem;
                  letter-spacing: -0.9px;
                  font-variation-settings: \"wght\" 600, \"opsz\" 32;
                }

                h2,
                h2 a {
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 1.75rem;
                  font-weight: 600;
                  line-height: 2.625rem;
                  letter-spacing: -0.28px;
                  font-variation-settings: \"wght\" 600, \"opsz\" 32;
                }

                h3,
                h3 a {
                  margin-top: 32px;
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 1.5rem;
                  font-weight: 600;
                  line-height: 1.5625rem;
                  letter-spacing: -0.24px;
                  font-variation-settings: \"wght\" 600, \"opsz\" 24;
                }

                h4,
                h4 a,
                h5,
                h5 a,
                h6,
                h6 a {
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 1.25rem;
                  font-weight: 600;
                  line-height: 1.25rem;
                  letter-spacing: -0.4px;
                  font-variation-settings: \"wght\" 600, \"opsz\" 20;
                }

                p,
                ol,
                ul,
                li,
                a {
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 0.875rem;
                  font-weight: 400;
                  line-height: 1.5rem;
                  letter-spacing: -0.14px;
                  font-variation-settings: \"wght\" 400, \"opsz\" 14;
                }

                ol {
                  list-style-type: decimal;
                }

                ul {
                  list-style-type: disc;
                }

                ol,
                ul {
                  margin-left: 20px;
                }

                strong {
                  font-weight: 600;
                  font-variation-settings: \"wght\" 600, \"opsz\" 16;
                }

                blockquote {
                  border-left: 2px solid #ff3f33;
                  padding-left: 20px;
                  font-family: Inter, system-ui, sans-serif;
                  font-size: 1.125rem;
                  font-style: italic;
                  font-weight: 400;
                  line-height: 1.875rem;
                  letter-spacing: -0.36px;
                  font-variation-settings: \"wght\" 400, \"opsz\" 18;
                }

                @media screen and (min-width: 1024px) {
                  h1,
                  h1 a {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 3rem;
                    font-weight: 600;
                    line-height: 3.75rem;
                    letter-spacing: -1.44px;
                    font-variation-settings: \"wght\" 600, \"opsz\" 32;
                  }

                  h2,
                  h2 a {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 2.25rem;
                    font-weight: 600;
                    line-height: 2.75rem;
                    letter-spacing: -0.36px;
                    font-variation-settings: \"wght\" 600, \"opsz\" 32;
                  }

                  h3,
                  h3 a {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 1.875rem;
                    font-weight: 600;
                    line-height: 2.375rem;
                    letter-spacing: -0.3px;
                    font-variation-settings: \"wght\" 600, \"opsz\" 30;
                  }

                  h4,
                  h4 a,
                  h5,
                  h5 a,
                  h6,
                  h6 a {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    line-height: 2rem;
                    letter-spacing: -0.48px;
                    font-variation-settings: \"wght\" 600, \"opsz\" 24;
                  }

                  p,
                  ol,
                  ul,
                  li,
                  a {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5rem;
                    letter-spacing: -0.16px;
                    font-variation-settings: \"wght\" 400, \"opsz\" 16;
                  }

                  strong {
                    font-weight: 600;
                    font-variation-settings: \"wght\" 600, \"opsz\" 18;
                  }

                  blockquote {
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 1.25rem;
                    font-style: italic;
                    line-height: 1.875rem;
                    letter-spacing: -0.4px;
                    font-weight: 400;
                    font-variation-settings: \"wght\" 400, \"opsz\" 20;
                  }
                }
              }

              .login-form {
                display: flex;
                flex-direction: column;
                gap: 24px;
                width: 100%;
                max-width: 578px;
                font-family: Inter, sans-serif;
              }

              .logo-wrapper {
                display: flex;
                justify-content: center;
              }

              .description {
                color: #1a1a1a;
                line-height: 150%;
                letter-spacing: -0.16px;
              }

              .kinde-control-label {
                color: #1a1a1a;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: -0.14px;
                padding-block-end: 4px;
              }

              .kinde-button-variant-primary {
                background-color: #d4352b;
              }

              .kinde-button-variant-primary:hover {
                background-color: #aa2a22;
              }

              .kinde-control-select-text:focus-visible {
                border: 0.0625rem solid #ababab;
                outline: 1px solid transparent;
              }

              .kinde-button-text {
                font-size: 18px;
                line-height: 28px;
                letter-spacing: -0.36px;
                font-weight: 600;
              }

              .kinde-text-button {
                text-decoration: underline;
              }

              .kinde-choice-separator {
                color: #1a1a1a;
                line-height: 150%;
                letter-spacing: -0.16px;
              }

              .kinde-fallback-action {
                color: #1a1a1a;
                line-height: 150%;
                letter-spacing: -0.16px;
              }

              kinde-text-link kinde-text-link-is-inline {
                color: #1a1a1a;
                line-height: 150%;
                letter-spacing: -0.16px;
              }

              .kinde-text-link {
                font-weight: 600;
              }

              .side-panel {
                display: flex;
                height: 100%;
                @media screen and (max-width: 1275px) {
                  display: none;
                }
                .side-panel-image {
                  width: 100%;
                  height: 100%;
                  aspect-ratio: 1;
                  object-fit: cover;
                  border-radius: 4px;
                }
              }

              /* Loading Styles */
              .auth-loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                transition: opacity 0.3s;
              }

              .auth-loading-hidden {
                opacity: 0;
                pointer-events: none;
              }

              /* Custom Spinner */
              .custom-spinner {
                display: inline-block;
                width: 40px;
                height: 40px;
                border: 5px solid #161616;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s linear infinite;
              }

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
          `}
        </style>
        <script
          nonce={getKindeNonce()}
          dangerouslySetInnerHTML={{
            __html: `
            // Create loading overlay
            document.addEventListener('DOMContentLoaded', function() {
              // Create loading elements
              const loadingOverlay = document.createElement('div');
              loadingOverlay.className = 'auth-loading-overlay';
              loadingOverlay.id = 'kinde-auth-loader';
              
              const spinner = document.createElement('div');
              spinner.className = 'custom-spinner';
              
              const loadingText = document.createElement('p');
              loadingText.innerText = '';
              loadingText.style.marginTop = '10px';
              
              // Add elements to DOM
              loadingOverlay.appendChild(spinner);
              loadingOverlay.appendChild(loadingText);
              document.body.appendChild(loadingOverlay);
              
              // Show loader initially
              loadingOverlay.classList.remove('auth-loading-hidden');
              
              // Hide loader when page is fully loaded
              window.addEventListener('load', function() {
                setTimeout(() => {
                  loadingOverlay.classList.add('auth-loading-hidden');
                }, 300);
              });
              
              // Track navigation completion
              let navigationTimeout;
              
              // Handle browser back/forward navigation
              window.addEventListener('popstate', function() {
                // Show loader during browser navigation events
                loadingOverlay.classList.remove('auth-loading-hidden');
                
                // Clear any existing timeout
                if (navigationTimeout) {
                  clearTimeout(navigationTimeout);
                }
                
                // Set a timeout to hide the loader
                navigationTimeout = setTimeout(() => {
                  loadingOverlay.classList.add('auth-loading-hidden');
                }, 1500); // 1.5 seconds for browser navigation
              });
              
              // Intercept history changes (pushState/replaceState)
              const originalPushState = window.history.pushState;
              const originalReplaceState = window.history.replaceState;
              
              window.history.pushState = function() {
                originalPushState.apply(this, arguments);
                // Show loader when history state changes
                loadingOverlay.classList.remove('auth-loading-hidden');
                
                // Clear any existing timeout
                if (navigationTimeout) {
                  clearTimeout(navigationTimeout);
                }
                
                // Set a timeout to hide the loader
                navigationTimeout = setTimeout(() => {
                  loadingOverlay.classList.add('auth-loading-hidden');
                }, 1500);
              };
              
              window.history.replaceState = function() {
                originalReplaceState.apply(this, arguments);
                // Show loader when history state changes
                loadingOverlay.classList.remove('auth-loading-hidden');
                
                // Clear any existing timeout
                if (navigationTimeout) {
                  clearTimeout(navigationTimeout);
                }
                
                // Set a timeout to hide the loader
                navigationTimeout = setTimeout(() => {
                  loadingOverlay.classList.add('auth-loading-hidden');
                }, 1500);
              };
              
              // Show loader on any link click within authentication pages
              document.addEventListener('click', function(e) {
                const closestLink = e.target.closest('a');
                const closestButton = e.target.closest('button');
                // Check if the click is on a payment logo image in the footer
                const isPaymentLogo = e.target.closest('footer img');
                
                const isKindeTextLink = e.target.classList && (
                  e.target.classList.contains('kinde-text-link') || 
                  (e.target.parentElement && e.target.parentElement.classList.contains('kinde-text-link'))
                );
                const isPrimaryButton = e.target.classList && (
                  e.target.classList.contains('kinde-button-variant-primary') ||
                  (e.target.closest('.kinde-button-variant-primary'))
                );
                
                // Skip showing loader for payment logo images that aren't wrapped in links
                if (isPaymentLogo && !closestLink) {
                  return;
                }
                
                if (isKindeTextLink || 
                    (closestLink && closestLink.href) || 
                    (closestButton && closestButton.type === 'submit') ||
                    isPrimaryButton) {
                  
                  // Show loader
                  loadingOverlay.classList.remove('auth-loading-hidden');
                  
                  // Clear any existing timeout
                  if (navigationTimeout) {
                    clearTimeout(navigationTimeout);
                  }
                  
                  // For external links, don't set a timeout to hide the loader
                  // since we want the loader to remain visible until navigation completes
                  if (closestLink && closestLink.href && 
                      (closestLink.href.indexOf('http://') === 0 || 
                       closestLink.href.indexOf('https://') === 0) &&
                      closestLink.hostname !== window.location.hostname) {
                    // For external links, don't hide the loader automatically
                    // The page will fully navigate away, so the loader should stay visible
                    return;
                  }
                  
                  // Set timeout based on what was clicked
                  // Use shorter timeout for text links, longer for buttons
                  let timeoutDuration = 1000; // default 1 second for text links
                  
                  if (isPrimaryButton || (closestButton && closestButton.type === 'submit')) {
                    timeoutDuration = 3000; // 3 seconds for primary buttons and submit buttons
                  }
                  
                  // Set a backup timeout to hide the loader if navigation doesn't complete
                  navigationTimeout = setTimeout(() => {
                    loadingOverlay.classList.add('auth-loading-hidden');
                  }, timeoutDuration);
                }
              });
              
              // Handle form submissions
              document.addEventListener('submit', function(e) {
                loadingOverlay.classList.remove('auth-loading-hidden');
              });
              
              // Monitor for DOM changes that indicate page load completion
              const observer = new MutationObserver(function(mutations) {
                // Check if mutations indicate auth content has loaded
                const kindeContentLoaded = mutations.some(mutation => {
                  return mutation.addedNodes.length > 0 || 
                         (mutation.target.classList && 
                          mutation.target.classList.contains('kinde-button-variant-primary'));
                });
                
                if (kindeContentLoaded) {
                  setTimeout(() => {
                    loadingOverlay.classList.add('auth-loading-hidden');
                    if (navigationTimeout) {
                      clearTimeout(navigationTimeout);
                    }
                  }, 300);
                }
              });
              
              // Start observing once DOM is loaded
              setTimeout(() => {
                const kindeRoot = document.querySelector('[data-kinde-root]');
                if (kindeRoot) {
                  observer.observe(kindeRoot, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    characterData: false
                  });
                }
              }, 500);
            });
          `,
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column' }}>
        {logo && (
          <header>
            <div className='header-container'>
              <div className='header-content'>
                <a href='https://www.kitchenwarehouse.com.au/'>
                  <div className='logo-wrapper'>
                    <picture>
                      <source
                        media='(prefers-color-scheme: dark)'
                        srcSet={logo}
                      />
                      <img
                        className='logo'
                        src={logo}
                        alt={context.widget.content.logoAlt}
                        width={152}
                        height={32}
                      />
                    </picture>
                  </div>
                </a>
                <div className='secure-login-container'>
                  <div className='secure-login'>Secure login</div>
                  <svg
                    width='24'
                    height='24'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                  >
                    <path
                      d='M16.5 10.5V6.75C16.5 4.26472 14.4853 2.25 12 2.25C9.51472 2.25 7.5 4.26472 7.5 6.75V10.5M6.75 21.75H17.25C18.4926 21.75 19.5 20.7426 19.5 19.5V12.75C19.5 11.5074 18.4926 10.5 17.25 10.5H6.75C5.50736 10.5 4.5 11.5074 4.5 12.75V19.5C4.5 20.7426 5.50736 21.75 6.75 21.75Z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </header>
        )}
        <main
          data-roast-root='true'
          data-kinde-root='true'
          className='content-container'
        >
          {children}
        </main>
        <footer>
          <div style={{ paddingBottom: '2.5rem' }}>
            {/* separator */}
            <div
              style={{
                borderTop: '1px solid #e6e6e6',
                width: '100%',
                marginTop: '1.5rem',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {/* need help */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  paddingTop: '1.5rem',
                }}
              >
                {helpText && (
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      lineHeight: '1.25rem',
                      letterSpacing: '-0.14px',
                      margin: '0',
                      color: '#1a1a1a',
                    }}
                  >
                    {helpText}
                  </span>
                )}
                {helpNumber && (
                  <div>
                    <a href={`tel:${helpNumber}`} style={{ color: '#1a1a1a' }}>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: '1.25rem',
                          letterSpacing: '-0.14px',
                          margin: '0',
                          fontWeight: '600',
                        }}
                      >
                        {helpNumber}
                      </span>
                    </a>
                  </div>
                )}
              </div>
              {/* logos */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {paymentLogos?.map(
                    (
                      logo: { name: string; paymentImageUrl: string },
                      index: number
                    ) => {
                      return (
                        logo?.paymentImageUrl && (
                          <div key={index}>
                            <picture>
                              <source
                                media='(prefers-color-scheme: dark)'
                                srcSet={logo.paymentImageUrl}
                              />
                              <img
                                alt={logo.name}
                                width='37'
                                height='23'
                                src={logo.paymentImageUrl}
                              />
                            </picture>
                          </div>
                        )
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
