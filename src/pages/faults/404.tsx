import React from 'react';
import {IonContent, IonPage} from '@ionic/react';
import Fault from './components/Fault';
import {useQuery} from '../../hooks';

const Fault404Page = () => {
  let query = useQuery();
  return (
    <IonPage>
      <IonContent>
        <div
          style={{
            width: '100%',
            height: '80%',
          }}
        >
          <Fault
            title="出现错误"
            description={query.get('msg') || ''}
          />
        </div>
      </IonContent>
    </IonPage>
  );
}
export default Fault404Page;
