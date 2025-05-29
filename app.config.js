import 'dotenv/config';

export default {
  expo: {
    name: 'bci-mobile',
    slug: 'bci-mobile',
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    }
  }
}
