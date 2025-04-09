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
    paymentLogos?: { name: string; image: string }[];
  };
}

export const Layout = ({
  request,
  context,
  children,
  props,
}: LayoutProps): React.JSX.Element => {
  console.log('props', props);
  const { logo, helpText, helpNumber } = props ?? {};
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
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            z-index: 300;
            padding-top: 1rem;
            padding-bottom: 0.5rem;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 1.5rem;
          }

          .header-content{
            margin: 0 auto;
            max-width: 1200px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items:center
            padding: 0.5rem 0;
            @media screen and (max-width: 1023px) {
              padding: 0.25rem 0;
            }
          }

           .container {
              display: flex;
              width: 100%;
              justify-content: center;
              @media screen and (max-width: 1023px) {
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
              width: 100%;
              gap: 120px;
              justify-content: center;
              flex: 1 0 0;
              padding: 176px 0px;
              @media screen and (max-width: 1023px) {
                padding: 48px 0;
              }
            }

            .login-form {
              display: flex;
              flex-direction: column;
              gap: 24px;
              width: 100%;
              max-width: 480px;
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
                @media screen and (max-width: 1023px) {
                    display: none;
                }
              }
              .side-panel-image {
                width: 100%;
                height: 75vh;
                object-fit: cover;
              }
            }
          `}
        </style>
      </head>
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
            </div>
          </div>
        </header>
      )}
      <body>
        <div data-roast-root='true' data-kinde-root='true'>
          {children}
        </div>
      </body>
      <footer>
        <div style={{ paddingBottom: '2.5rem' }}>
          <div style={{ border: '0 solid #e6e6e6', width: '100%' }} />
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
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
                  <a href={`tel:${helpNumber}`}>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        letterSpacing: '-0.14px',
                        margin: '0',
                        fontWeight: '600',
                        color: '#1a1a1a',
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
            {/* <div>
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
                  (logo: { name: string; image: string }, index: number) => {
                    return (
                      logo?.image && (
                        <div key={index}>
                          <img
                            alt={logo.name}
                            loading='lazy'
                            width='62'
                            height='40'
                            src={logo.image}
                          />
                        </div>
                      )
                    );
                  }
                )}
              </div>
            </div> */}
          </div>
        </div>
      </footer>
    </html>
  );
};

export default Layout;
