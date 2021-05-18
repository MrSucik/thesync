import firebase from "firebase/firestore";

export type Timestamp = firebase.firestore.Timestamp;

interface FirestoreDocument {
  id: string;
}

export interface UserModel extends FirestoreDocument {
  created: Timestamp;
  email: string;
  devices: string[];
  displayName?: string;
  photoURL?: string;
  lastLogin?: Timestamp;
  bigD?: boolean;
}

export interface MediaModel extends FirestoreDocument {
  created: Timestamp;
  thumbnail: string;
  name: string;
  duration: number;
  file: string;
  fileType: "image" | "video";
  color: string;
}

export interface DeviceModel extends FirestoreDocument {
  created: Timestamp;
  name: string;
  scene: string;
  icon: string;
  status: "online" | "offline";
}

export interface SceneModel extends FirestoreDocument {
  created: Timestamp;
  name: string;
  footer: string;
  author: string;
  backgroundColor: string;
  mediaList: string[];
}

export interface Scene extends FirestoreDocument {
  name: string;
  mediaList: MediaModel[];
  devicesList: DeviceModel[];
}

export interface ConfigurationModel extends FirestoreDocument {
  created: Timestamp;
  autoSuplDate: boolean;
  autoPlanDate: boolean;
  planDate: Timestamp;
  suplDate: Timestamp;
}
