import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_WHY_DID_YOU_RENDER === 'true') {
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackHooks: true
    });
}