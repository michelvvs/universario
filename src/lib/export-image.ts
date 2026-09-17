import { toPng, toBlob } from 'html-to-image';
import JSZip from 'jszip';

export async function captureElementAsPng(
  element: HTMLElement,
  fileName: string = 'story-universario.png'
): Promise<string> {
  try {
    // Render at high resolution for Instagram Stories (1080x1920)
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: true,
      skipFonts: false,
      style: {
        borderRadius: '0px',
        transform: 'none',
      },
    });

    return dataUrl;
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    throw error;
  }
}

export function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function shareOrDownloadSlide(
  element: HTMLElement,
  title: string,
  fileName: string = 'universario-story.png'
): Promise<void> {
  try {
    const blob = await toBlob(element, {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: true,
      style: {
        borderRadius: '0px',
        transform: 'none',
      },
    });

    if (!blob) throw new Error('Não foi possível gerar a imagem.');

    const file = new File([blob], fileName, { type: 'image/png' });

    // Check if Web Share API with files is supported (e.g. Mobile iOS/Android)
    if (
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        title: title || 'Meu Universário - O dia em que nasci',
        text: 'Descubra como estava o mundo no dia em que você nasceu! ✨🪐',
        files: [file],
      });
      return;
    }

    // Fallback: direct download
    const url = URL.createObjectURL(blob);
    downloadDataUrl(url, fileName);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (error) {
    console.error('Erro ao compartilhar/baixar:', error);
    // Fallback to simple PNG capture
    const pngUrl = await captureElementAsPng(element, fileName);
    downloadDataUrl(pngUrl, fileName);
  }
}

export async function downloadAllStoriesAsZip(
  slideElements: HTMLElement[],
  dateFormatted: string
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(`universario-${dateFormatted.replace(/[^a-zA-Z0-9]/g, '_')}`);

  for (let i = 0; i < slideElements.length; i++) {
    const el = slideElements[i];
    try {
      const blob = await toBlob(el, {
        quality: 0.95,
        pixelRatio: 2.5,
        cacheBust: true,
        style: {
          borderRadius: '0px',
          transform: 'none',
        },
      });

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
  setTimeout(() => URL.revokeObjectURL(zipUrl), 3000);
}
