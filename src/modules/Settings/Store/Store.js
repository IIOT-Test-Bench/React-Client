import {configureStore} from '@reduxjs/toolkit';
import publisher from './PublisherSlice';
import subscriber from './SubscriberSlice';
import settings from './SettingsSlice';



const rootReducer = {
    settings: settings.reducer,
    publisher: publisher.reducer,
    subscriber: subscriber.reducer
  }
  
  
  export const store = configureStore({
      reducer: rootReducer
  })