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
              flex: 1 0 0;
            }

            .container {
              display: flex;
              width: 100%;
              justify-content: center;
              gap: 3rem;
              @media screen and (max-width: 1275px) {
                flex-direction: column;
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
              gap: 60px;
              justify-content: center;
              align-items: center;
              flex: 1 0 0;
            }

            .signInFormTextTopText, .signupFormTextTopText, .signInFormTextBottomText, .signupFormTextBottom {
                color: #1A1A1A;
                font-family: Inter, sans-serif;
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
                height: calc(100vh - 233px);
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
                    stroke-width='1.5'
                  >
                    <path
                      d='M16.5 10.5V6.75C16.5 4.26472 14.4853 2.25 12 2.25C9.51472 2.25 7.5 4.26472 7.5 6.75V10.5M6.75 21.75H17.25C18.4926 21.75 19.5 20.7426 19.5 19.5V12.75C19.5 11.5074 18.4926 10.5 17.25 10.5H6.75C5.50736 10.5 4.5 11.5074 4.5 12.75V19.5C4.5 20.7426 5.50736 21.75 6.75 21.75Z'
                      stroke='currentColor'
                      stroke-width='1.5'
                      stroke-linecap='round'
                      stroke-linejoin='round'
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
