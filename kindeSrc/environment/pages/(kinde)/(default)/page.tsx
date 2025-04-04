'use server';

import {
  getDarkModeLogoUrl,
  getKindeWidget,
  getLogoUrl,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
// @ts-expect-error: renderToString is not available in the server environment
import { renderToString } from 'react-dom/server.browser';
import Layout from '../../layout';
import ClientLink from '@/app/components/ClientLink';

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Layout context={context} request={request}>
      <div className='container'>
        <main className='login-form-wrapper'>
          <div className='login-form'>
            <div className='logo-wrapper'>
              <ClientLink href={`${process.env.KINDE_SITE_URL ?? '#'}`}>
                test
              </ClientLink>
              {/* <Link href={`${process.env.KINDE_SITE_URL ?? '#'}`}> */}
                <picture>
                  <source
                    media='(prefers-color-scheme: dark)'
                    srcSet={getDarkModeLogoUrl()}
                  />
                  <img
                    className='logo'
                    src={getLogoUrl()}
                    alt={context.widget.content.logoAlt}
                    width={152}
                    height={32}
                  />
                </picture>
              {/* </Link> */}
            </div>
            {context.widget.content.heading && (
              <h2 className='heading'>{context.widget.content.heading}</h2>
            )}
            <p className='description'>{context.widget.content.description}</p>
            {getKindeWidget()}
          </div>
        </main>
        <div className='side-panel'>
          <img
            className='side-panel-image'
            src='https://media.kitchenwarehouse.com.au/image/upload/Kitchen%20Warehouse%20Images%20/kinde_login.png'
            alt='image'
          />
        </div>
      </div>
    </Layout>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await DefaultPage(event);
  return renderToString(page);
}
