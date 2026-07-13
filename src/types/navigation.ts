export type MainTabParamList = {
  Today: undefined;
  Train: undefined;
  Nutrition: undefined;
  Progress: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Profile: undefined;
  DesignGallery: undefined;
};

export type QuickAction =
  | 'Start workout'
  | 'Log food'
  | 'Add water'
  | 'Check in'
  | 'Log bodyweight'
  | 'Ask coach';
