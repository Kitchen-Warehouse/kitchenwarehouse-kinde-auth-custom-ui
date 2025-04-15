'use server';

import {
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
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
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style nonce={getKindeNonce()}>
          {`
            .header-container {
              padding: 1rem 2rem;
            }

            .header-content{
              display: flex;
              width: 100%;
              justify-content: space-between;
              align-items:center;
              padding: 0.5rem 0;
              @media screen and (max-width: 1275px) {
                padding: 0.25rem 0;
              }
            }

            .secure-login-container{
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
              display:flex;
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

            .signInFormTextTopText, .signupFormTextTopText, .signInFormTextBottomText, .signupFormTextBottom {
                color: #1A1A1A;
                font-family: Inter, sans-serif;
                hr {
                  margin: 20px 0;
                  border-color: var(--color-divider-border);
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

                h1, h1 a {
                  font-family: var(--typography-display-lg-mobile-font-family);
                  font-size: var(--typography-display-lg-mobile-font-size);
                  font-style: var(--typography-display-lg-mobile-font-style);
                  font-weight: var(--typography-display-lg-mobile-font-weight);
                  line-height: var(--typography-display-lg-mobile-line-height);
                  letter-spacing: var(--typography-display-lg-mobile-letter-spacing);
                  font-variation-settings: var(--typography-display-lg-mobile-font-variation-settings);
                }

                h2, h2 a {
                  font-family: var(--typography-display-md-mobile-font-family);
                  font-size: var(--typography-display-md-mobile-font-size);
                  font-style: var(--typography-display-md-mobile-font-style);
                  font-weight: var(--typography-display-md-mobile-font-weight);
                  line-height: var(--typography-display-md-mobile-line-height);
                  letter-spacing: var(--typography-display-md-mobile-letter-spacing);
                  font-variation-settings: var(--typography-display-md-mobile-font-variation-settings);
                }

                h3, h3 a {
                  margin-top: 32px;

                  font-family: var(--typography-display-sm-mobile-font-family);
                  font-size: var(--typography-display-sm-mobile-font-size);
                  font-style: var(--typography-display-sm-mobile-font-style);
                  font-weight: var(--typography-display-sm-mobile-font-weight);
                  line-height: var(--typography-display-sm-mobile-line-height);
                  letter-spacing: var(--typography-display-sm-mobile-letter-spacing);
                  font-variation-settings: var(--typography-display-sm-mobile-font-variation-settings);
                }

                h4, h4 a,
                h5, h5 a,
                h6, h6 a {
                  font-family: var(--typography-display-xs-mobile-font-family);
                  font-size: var(--typography-display-xs-mobile-font-size);
                  font-style: var(--typography-display-xs-mobile-font-style);
                  font-weight: var(--typography-display-xs-mobile-font-weight);
                  line-height: var(--typography-display-xs-mobile-line-height);
                  letter-spacing: var(--typography-display-xs-mobile-letter-spacing);
                  font-variation-settings: var(--typography-display-xs-mobile-font-variation-settings);
                }

                p,
                ol,
                ul,
                li,
                a {
                  font-family: var(--typography-body-md-mobile-font-family);
                  font-size: var(--typography-body-md-mobile-font-size);
                  font-style: var(--typography-body-md-mobile-font-style);
                  line-height: var(--typography-body-md-mobile-line-height);
                  letter-spacing: var(--typography-body-md-mobile-letter-spacing);
                  font-weight: var(--typography-body-md-mobile-font-weight);
                  font-variation-settings: var(--typography-body-md-mobile-font-variation-settings);
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
                  font-weight: var(--typography-semibold-mobile-font-weight);
                  font-variation-settings: var(--typography-semibold-mobile-font-variation-settings);
                }

                blockquote {
                  border-left: 2px solid var(--color-base-brand);
                  padding-left: 20px;

                  font-family: var(--typography-body-xl-mobile-font-family);
                  font-size: var(--typography-body-xl-mobile-font-size);
                  font-style: italic;
                  line-height: var(--typography-body-xl-mobile-line-height);
                  letter-spacing: var(--typography-body-xl-mobile-letter-spacing);
                  font-weight: var(--typography-semibold-mobile-font-weight);
                  font-variation-settings: var(--typography-semibold-mobile-font-variation-settings);
                }

                @media screen and (min-width: 1024px) {
                  h1, h1 a {
                    font-family: var(--typography-display-lg-font-family);
                    font-size: var(--typography-display-lg-font-size);
                    font-style: var(--typography-display-lg-font-style);
                    font-weight: var(--typography-display-lg-font-weight);
                    line-height: var(--typography-display-lg-line-height);
                    letter-spacing: var(--typography-display-lg-letter-spacing);
                    font-variation-settings: var(--typography-display-lg-font-variation-settings);
                  }

                  h2, h2 a {
                    font-family: var(--typography-display-md-font-family);
                    font-size: var(--typography-display-md-font-size);
                    font-style: var(--typography-display-md-font-style);
                    font-weight: var(--typography-display-md-font-weight);
                    line-height: var(--typography-display-md-line-height);
                    letter-spacing: var(--typography-display-md-letter-spacing);
                    font-variation-settings: var(--typography-display-md-font-variation-settings);
                  }

                  h3, h3 a {
                    font-family: var(--typography-display-sm-font-family);
                    font-size: var(--typography-display-sm-font-size);
                    font-style: var(--typography-display-sm-font-style);
                    font-weight: var(--typography-display-sm-font-weight);
                    line-height: var(--typography-display-sm-line-height);
                    letter-spacing: var(--typography-display-sm-letter-spacing);
                    font-variation-settings: var(--typography-display-sm-font-variation-settings);
                  }

                  h4, h4 a,
                  h5, h5 a,
                  h6, h6 a {
                    font-family: var(--typography-display-xs-font-family);
                    font-size: var(--typography-display-xs-font-size);
                    font-style: var(--typography-display-xs-font-style);
                    font-weight: var(--typography-display-xs-font-weight);
                    line-height: var(--typography-display-xs-line-height);
                    letter-spacing: var(--typography-display-xs-letter-spacing);
                    font-variation-settings: var(--typography-display-xs-font-variation-settings);
                  }

                  p,
                  ol,
                  ul,
                  li,
                  a {
                    font-family: var(--typography-body-md-font-family);
                    font-size: var(--typography-body-md-font-size);
                    font-style: var(--typography-body-md-font-style);
                    line-height: var(--typography-body-md-line-height);
                    letter-spacing: var(--typography-body-md-letter-spacing);
                    font-weight: var(--typography-body-md-font-weight);
                    font-variation-settings: var(--typography-body-md-font-variation-settings);
                  }

                  strong {
                    font-weight: var(--typography-semibold-font-weight);
                    font-variation-settings: var(--typography-semibold-font-variation-settings);
                  }

                  blockquote {
                    font-family: var(--typography-body-xl-font-family);
                    font-size: var(--typography-body-xl-font-size);
                    font-style: italic;
                    line-height: var(--typography-body-xl-line-height);
                    letter-spacing: var(--typography-body-xl-letter-spacing);
                    font-weight: var(--typography-semibold-font-weight);
                    font-variation-settings: var(--typography-semibold-font-variation-settings);
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
              color: #1A1A1A;
              line-height: 150%;
              letter-spacing: -0.16px;
            }

            .kinde-control-label {
              color: #1A1A1A;
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
              color: #1A1A1A;
              line-height: 150%;
              letter-spacing: -0.16px;
            }

            .kinde-fallback-action {
              color: #1A1A1A;
              line-height: 150%;
              letter-spacing: -0.16px;
            }

            kinde-text-link kinde-text-link-is-inline {
              color: #1A1A1A;
              line-height: 150%;
              letter-spacing: -0.16px;
            }

            .kinde-text-link {
              font-weight: 600;
            }

            .side-panel {
              flex: 1 0 0;
                @media screen and (max-width: 1275px) {
                    display: none;
                }
              }
              .side-panel-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          `}
        </style>
      </head>
      <body style={{ display: 'flex', flexDirection: 'column' }}>
        {logo && (
          <header>
            <div className='header-container'>
              <div className='header-content'>
                <a href='https://kwh-kitchenwarehouse.netlify.app/'>
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
              {/* customer reference */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
                  Your customer reference #:
                </span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    letterSpacing: '-0.14px',
                    margin: '0',
                    color: '#1a1a1a',
                  }}
                ></span>
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
