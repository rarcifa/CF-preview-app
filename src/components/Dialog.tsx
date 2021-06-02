import React, { useEffect, useState } from 'react';
import { DialogExtensionSDK } from '@contentful/app-sdk';

interface DialogProps {
  sdk: DialogExtensionSDK;
}

const Dialog = (props: DialogProps) => {
  
  // use effect
  useEffect(() => {
    // This ensures our app has enough space to render
    props.sdk.window.startAutoResizer();  
  });

  // add preview url params
  const preview = 'http://localhost:3000'
  return <>
  {/** IFrame loading component; Iframe src may be replaced with the 
   * desired link. Depending on Frotnend configuration, both full
   *  pagers as well as individual components may be used. */}
  <iframe src={preview}
        title="Component Preview" 
        height="800px" 
        width="100%">
  </iframe>
  </>;
};

export default Dialog;