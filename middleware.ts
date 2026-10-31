export async function GET() {
  return Response.json({
    ok: true,
    app: 'AegisFlow',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
