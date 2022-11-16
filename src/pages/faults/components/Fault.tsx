import React, {useEffect} from 'react';
import imgFaults from '../images/faults.png';
import {uploadErrorToArms} from '../../../service/utils';

type Props = {
  title?: string;
  description?: string;
}
const Fault:React.FC<Props> = (props) => {

  useEffect(() => {
   uploadErrorToArms('关键错误', props.description || props.title || '未知错误');
  })
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={imgFaults}
        alt='fault'
        style={{
          width: '156px',
          height: '156px',
        }}
      />
      {props.title && <div
        style={{
          paddingTop: 'var(--ion-padding-lg)',
          maxWidth: '156px',
          fontSize: '16px',
          color: 'var(--ion-color-step-600)',
        }}
      >
        {props.title}
      </div>}
      {props.description && <div
        style={{
          paddingTop: 'var(--ion-padding-lg)',
          maxWidth: '156px',
          fontSize: '14px',
          color: 'var(--ion-color-step-400)',
        }}
      >
        {props.description}
      </div>}
    </div>
  );
}
export default Fault;
