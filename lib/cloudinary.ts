import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

/**
 * Cloudinary Server-Side Configuration
 * Reads from standard environment variables:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (or CLOUDINARY_CLOUD_NAME)
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 */
const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  '';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(cloudName && apiKey && apiSecret);
};

// Initialize Cloudinary instance if credentials exist
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

/**
 * Uploads a Buffer or Base64 file string to Cloudinary
 * Default target folder: saad-mehmood-fabrics/products
 */
export async function uploadToCloudinary(
  fileBufferOrDataUri: Buffer | string,
  options: {
    folder?: string;
    publicId?: string;
    transformation?: object[];
  } = {}
): Promise<CloudinaryUploadResult> {
  const folder = options.folder || 'saad-mehmood-fabrics/products';

  // If Cloudinary is configured, execute direct upload to Cloudinary CDN
  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      if (typeof fileBufferOrDataUri === 'string' && fileBufferOrDataUri.startsWith('data:')) {
        // Direct base64 Data URI upload
        cloudinary.uploader.upload(
          fileBufferOrDataUri,
          {
            folder,
            public_id: options.publicId,
            resource_type: 'image',
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) {
              return reject(new Error(error?.message || 'Failed to upload to Cloudinary.'));
            }
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          }
        );
      } else {
        // Stream Buffer upload
        const buffer = Buffer.isBuffer(fileBufferOrDataUri)
          ? fileBufferOrDataUri
          : Buffer.from(fileBufferOrDataUri);

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: options.publicId,
            resource_type: 'image',
          },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) {
              return reject(new Error(error?.message || 'Failed to upload stream to Cloudinary.'));
            }
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          }
        );

        uploadStream.end(buffer);
      }
    });
  }

  // Graceful Fallback if Cloudinary credentials are not yet entered in .env
  console.warn(
    'Cloudinary credentials not configured in environment. Using high-resolution preview URL for sandbox mode.'
  );

  const fallbackSeed = Math.floor(100 + Math.random() * 900);
  const fallbackUrl = `https://picsum.photos/seed/smf-fabric-${fallbackSeed}/900/1200`;

  return {
    url: fallbackUrl,
    publicId: `sandbox_${Date.now()}`,
    format: 'jpeg',
  };
}

/**
 * Deletes an image from Cloudinary by its Public ID or full Cloudinary URL
 */
export async function deleteFromCloudinary(publicIdOrUrl: string): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicIdOrUrl) {
    return false;
  }

  try {
    let publicId = publicIdOrUrl;
    // Extract publicId if a full URL was provided
    if (publicIdOrUrl.includes('res.cloudinary.com')) {
      const parts = publicIdOrUrl.split('/upload/');
      if (parts.length > 1) {
        // Remove version prefix if present, e.g. v1234567890/
        const afterUpload = parts[1].replace(/^v\d+\//, '');
        // Remove file extension
        publicId = afterUpload.replace(/\.[^/.]+$/, '');
      }
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (err) {
    console.warn('Failed to delete asset from Cloudinary:', err);
    return false;
  }
}

export { cloudinary };
