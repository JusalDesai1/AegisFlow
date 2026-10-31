export async function GET() {
  const hasSupabaseConfig = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return Response.json({
    ok: true,
    app: 'AegisFlow',
    status: 'healthy',
    database: hasSupabaseConfig ? 'supabase-configured' : 'mock-mode',
    authSecret: process.env.NODE_ENV === 'production' ? 'configured' : 'development',
    mapbox: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? 'configured' : 'missing',
    timestamp: new Date().toISOString(),
  });
}
