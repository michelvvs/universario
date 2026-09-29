import { toPng, toBlob } from 'html-to-image';
import JSZip from 'jszip';

export interface ShareResult {
  success: boolean;
  method: 'web-share' | 'download' | 'modal';
  dataUrl?: string;
  blob?: Blob;
  error?: string;
}

/**
 * Pre-checks and ensures all <img> tags inside element are fully loaded and decoded
 * before canvas capture to prevent blank or black placeholders.
 */
async function ensureImagesLoaded(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        const timer = setTimeout(resolve, 1500);
        img.onload = () => {
          clearTimeout(timer);
          resolve(null);
        };
        img.onerror = () => {
          clearTimeout(timer);
          resolve(null);
        };
      });
    })
  );
}

/**
 * Calculates export options tailored for exact 1080x1920 Instagram Story resolution (9:16 ratio)
 * without multiplying canvas dimensions into iOS Safari memory crash limits.
 */
function getExportOptions(element: HTMLElement, quality: number = 0.95) {
  const rect = element.getBoundingClientRect();
  const width = rect.width || element.offsetWidth || 420;
  // Calculate precise pixel ratio to scale up to standard 1080px width
  const pixelRatio = 1080 / width;

  return {
    quality,
    pixelRatio,
    // Do NOT enable cacheBust: true, as it forces extra HTTP requests bypassing cached base64/memory images
    cacheBust: false,
    backgroundColor: '#08080c',
    filter: (node: Node) => {
      if (node instanceof HTMLElement) {
        if (
          node.classList.contains('story-touch-left') ||
          node.classList.contains('story-touch-right') ||
          node.classList.contains('tv-static-burst') ||
          node.classList.contains('tv-beam-line') ||
          node.classList.contains('tv-channel-hud') ||
          node.classList.contains('story-progress-container') ||
          node.classList.contains('story-header-pill') ||
          node.classList.contains('story-nav-bar') ||
          node.classList.contains('story-nav-btn')
        ) {
          return false;
        }
      }
      return true;
    },
    style: {
      borderRadius: '0px',
      transform: 'none',
      boxShadow: 'none',
      border: 'none',
      margin: '0',
    },
  };
}

export function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Captures an element as PNG Blob in 1080x1920 resolution.
 */
export async function captureElementAsBlob(
  element: HTMLElement,
  quality: number = 0.95
): Promise<Blob> {
  element.classList.add('is-exporting');
  try {
    await ensureImagesLoaded(element);
    const blob = await toBlob(element, getExportOptions(element, quality));
    if (!blob) throw new Error('Não foi possível gerar a imagem em alta resolução.');
    return blob;
  } finally {
    element.classList.remove('is-exporting');
  }
}

/**
 * Captures an element as PNG DataUrl in 1080x1920 resolution.
 */
export async function captureElementAsPng(
  element: HTMLElement,
  fileName: string = 'story-universario.png'
): Promise<string> {
  element.classList.add('is-exporting');
  try {
    await ensureImagesLoaded(element);
    const dataUrl = await toPng(element, getExportOptions(element, 0.95));
    return dataUrl;
  } catch (error) {
    console.error('Erro ao gerar PNG:', error);
    throw error;
  } finally {
    element.classList.remove('is-exporting');
  }
}

/**
 * Lowest-friction flow for Instagram Stories on mobile (iOS/Android) and desktop:
 * - Uses Web Share API with ONLY files (NO text or title) so iOS Safari and Android Chrome
 *   immediately route directly into Instagram Stories / WhatsApp / Camera Roll.
 * - On desktop or unsupported browsers, downloads the 1080x1920 PNG and offers deep-link helper.
 */
export async function shareStoryToInstagram(
  element: HTMLElement,
  fileName: string = 'universario-story.png'
): Promise<ShareResult> {
  try {
    const blob = await captureElementAsBlob(element, 0.95);
    const file = new File([blob], fileName, { type: 'image/png' });

    // 1. Mobile Web Share API:
    // IMPORTANT: Providing ONLY `files` (no `text`, no `title`) allows iOS Safari
    // and Android to open the native share sheet with Instagram Stories directly!
    if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
        });
        return { success: true, method: 'web-share', blob };
      } catch (err: any) {
        if (err.name === 'AbortError') {
          // User dismissed the share dialog
          return { success: false, method: 'web-share' };
        }
        console.warn('Web Share falhou, tentando fallback:', err);
      }
    }

    // 2. Fallback: generate dataUrl for direct download or mobile preview modal
    const dataUrl = await captureElementAsPng(element, fileName);
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // In mobile in-app webviews (e.g. Instagram webview, TikTok, Twitter), direct download doesn't work.
      // Trigger modal so user can long-press to save or open Instagram app!
      return { success: true, method: 'modal', dataUrl, blob };
    } else {
      // Desktop: instant 1080x1920 PNG download
      downloadDataUrl(dataUrl, fileName);
      return { success: true, method: 'download', dataUrl, blob };
    }
  } catch (error: any) {
    console.error('Erro ao compartilhar Story:', error);
    // Ultimate fallback: simple PNG capture & download
    try {
      const dataUrl = await captureElementAsPng(element, fileName);
      downloadDataUrl(dataUrl, fileName);
      return { success: true, method: 'download', dataUrl };
    } catch (fallbackErr: any) {
      return { success: false, method: 'download', error: fallbackErr?.message || 'Falha ao exportar' };
    }
  }
}

/**
 * Direct PNG download of the current story slide.
 */
export async function downloadSingleSlide(
  element: HTMLElement,
  fileName: string = 'universario-story.png'
): Promise<void> {
  const dataUrl = await captureElementAsPng(element, fileName);
  downloadDataUrl(dataUrl, fileName);
}

/**
 * Downloads all slides as a ZIP archive of 1080x1920 PNGs.
 */
export async function downloadAllStoriesAsZip(
  slideElements: HTMLElement[],
  dateFormatted: string
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(`universario-${dateFormatted.replace(/[^a-zA-Z0-9]/g, '_')}`);

  for (let i = 0; i < slideElements.length; i++) {
    const el = slideElements[i];
    try {
      const blob = await captureElementAsBlob(el, 0.92);
      if (blob) {
        folder?.file(`story_${i + 1}_universario.png`, blob);
      }
    } catch (err) {
      console.warn(`Erro ao exportar slide ${i + 1}:`, err);
    }
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(zipBlob);
  downloadDataUrl(zipUrl, `universario-stories-${dateFormatted.replace(/\s+/g, '-')}.zip`);
  setTimeout(() => URL.revokeObjectURL(zipUrl), 4000);
}

// Backwards compatibility
export const shareOrDownloadSlide = async (
  element: HTMLElement,
  _title: string,
  fileName: string = 'universario-story.png'
) => {
  await shareStoryToInstagram(element, fileName);
};
