import './globals.css';

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'WSS',
  description: 'Generated by create next app',
  other: {
    'theme-color': '#342b4c',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
