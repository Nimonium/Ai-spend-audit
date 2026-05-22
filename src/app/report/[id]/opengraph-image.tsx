import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'AI Spend Audit Results';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  // TODO: Fetch the audit result using the ID parameter to dynamically 
  // inject the specific dollar savings amount into the generated OG image.
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: 80, letterSpacing: '-0.05em' }}>
            AI Spend Audit
          </h1>
          <p style={{ fontSize: 40, color: '#94a3b8', marginTop: 20 }}>
            Discover your hidden startup savings.
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
