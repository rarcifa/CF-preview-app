// @ts-nocheck
import React from 'react';
import { Button } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = (props: FieldProps) => {
  // Dialog functionality
  const openDialog = () => {
    props.sdk.dialogs.openCurrentApp({
      width: 'fullWidth',
      position: 'center',
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
    })
  }
  console.log(props)
  return <>
  <Button buttonType="muted" onClick={openDialog} size="small">Preview</Button>
  </>
};

export default Field;
