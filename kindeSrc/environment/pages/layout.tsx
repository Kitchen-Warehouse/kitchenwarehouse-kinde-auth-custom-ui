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
}

export const Layout = ({
  request,
  context,
  children,
}: LayoutProps): React.JSX.Element => {
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
                height: 100vh;
                object-fit: cover;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div data-roast-root='true' data-kinde-root='true'>
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
