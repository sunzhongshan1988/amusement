import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
