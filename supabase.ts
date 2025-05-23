import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';


if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

AppState.addEventListener('change', async (state) => {
  if (state === 'active') {
    await supabase.auth.startAutoRefresh();
  } else {
    await supabase.auth.stopAutoRefresh();
  }
});

