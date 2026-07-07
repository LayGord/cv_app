import { Resume } from 'entities/Resume';
import { ResumePdfTemplate } from '../../../ui/ResumePdfTemplate/ResumePdfTemplate';
import { pdf } from '@react-pdf/renderer';
import * as pdfjsLib from 'pdfjs-dist';
import { blobToDataUrl } from 'shared/lib/idb/helpers/blobToDataUrl';

interface GenerateResumePreviewImageOptions {
  width?: number;
  imageType?: 'image/png' | 'image/jpeg';
  quality?: number;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const generateResumePreviewBlob = async (
    resume: Resume,
    options: GenerateResumePreviewImageOptions = {},
): Promise<Blob> => {
    const {
        width = 320,
        imageType = 'image/png',
        quality = 0.92,
    } = options;

    const pdfBlob = await pdf(<ResumePdfTemplate data={resume} />).toBlob();
    const pdfBytes = await pdfBlob.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdfDocument = await loadingTask.promise;
    const page = await pdfDocument.getPage(1);

    const baseViewport = page.getViewport({ scale: 1 });
    const scale = width / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Canvas 2D context is not available');
    }

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    await page.render({
        canvas,
        canvasContext: context,
        viewport,
    }).promise;

    const imageBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Failed to create preview image'));
                    return;
                }

                resolve(blob);
            },
            imageType,
            imageType === 'image/jpeg' ? quality : undefined,
        );
    });

    page.cleanup();
    pdfDocument.cleanup();
    loadingTask.destroy();

    return imageBlob;
};

export const generateResumePreviewUrl = async (data: Resume) => {
    const previewImgBlob = await generateResumePreviewBlob(data);
    const prevImg = await blobToDataUrl(previewImgBlob);
    return prevImg
}