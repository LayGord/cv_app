import QRCode from 'qrcode';

interface GenerateQrCodeOptions {
  size?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export const generateQrCode = async (
    value: string,
    options: GenerateQrCodeOptions = {},
): Promise<string> => {
    const {
        size = 128,
        margin = 2,
        errorCorrectionLevel = 'M',
    } = options;

    return QRCode.toDataURL(value, {
        type: 'image/png',
        width: size,
        margin,
        errorCorrectionLevel,
    });
};