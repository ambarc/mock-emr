'use client';

import { useEffect, useRef } from 'react';

export default function IframeContent({ children }: { children: React.ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Set iframe content
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Copy the parent page's styles to the iframe
    const styles = Array.from(document.getElementsByTagName('link'))
      .filter(link => link.rel === 'stylesheet')
      .map(link => link.cloneNode(true));

    doc.head.append(...styles);

    // Create and append the content wrapper
    const contentWrapper = doc.createElement('div');
    contentWrapper.className = 'min-h-screen bg-gray-50';
    doc.body.appendChild(contentWrapper);

    // Render the children into the iframe
    const root = doc.createElement('div');
    root.innerHTML = document.querySelector('[data-iframe-content]')?.innerHTML || '';
    contentWrapper.appendChild(root);

    // Copy parent's body classes
    doc.body.className = document.body.className;
  }, [children]);

  return (
    <>
      <div className="hidden" data-iframe-content>
        {children}
      </div>
      <iframe
        ref={iframeRef}
        className="w-full h-[calc(100vh-4rem)] border-none"
        title="Patient Content"
      />
    </>
  );
} 