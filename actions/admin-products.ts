'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import {
  getProductById,
  createCatalogProduct,
  updateCatalogProduct,
  deleteCatalogProduct,
} from '@/lib/db';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import type { AdminProductActionState, UploadImageResult } from '@/lib/types/admin';

/**
 * Authorization guard: verifies current user has role === 'admin'
 */
async function checkAdminAuth(): Promise<{ authorized: boolean; error?: string }> {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return {
        authorized: false,
        error: 'Unauthorized: You must be logged in as an Administrator to perform this operation.',
      };
    }
    return { authorized: true };
  } catch {
    return { authorized: false, error: 'Authentication verification failed.' };
  }
}

/**
 * Slugify title into URL-friendly slug
 */
function generateSlug(text: string): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${base || 'fabric'}-${suffix}`;
}

/**
 * Maps high-level collection name to collection slug
 */
function getCollectionSlug(collectionName: string): string {
  const normalized = collectionName.toLowerCase();
  if (normalized.includes('haibat') || normalized.includes('cotton')) {
    return 'haibat-majmua';
  }
  if (normalized.includes('mehrab') || normalized.includes('wash')) {
    return 'mehrab-intikhab';
  }
  if (normalized.includes('raees') || normalized.includes('latha')) {
    return 'raees-riwayat';
  }
  return 'haibat-majmua';
}

/**
 * Server Action: Uploads an image directly to Cloudinary
 * Folder: saad-mehmood-fabrics/products
 */
export async function uploadProductImage(formData: FormData): Promise<UploadImageResult> {
  const auth = await checkAdminAuth();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return { success: false, error: 'No image file provided for upload.' };
  }

  // Validate file size (max 8MB)
  if (file.size > 8 * 1024 * 1024) {
    return { success: false, error: 'File size exceeds maximum 8MB limit.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer, {
      folder: 'saad-mehmood-fabrics/products',
    });

    return {
      success: true,
      url: result.url,
    };
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Cloudinary image upload failed.',
    };
  }
}

/**
 * Server Action: Create Product with Cloudinary image URLs and Neon DB insertion
 */
export async function createProduct(
  prevState: AdminProductActionState | null | undefined,
  formData: FormData
): Promise<AdminProductActionState> {
  const auth = await checkAdminAuth();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const name = (formData.get('name') as string)?.trim() || '';
  const collection = (formData.get('collection') as string)?.trim() || 'Haibat Majmua';
  const fabricType = (formData.get('fabricType') as string)?.trim() || 'Egyptian Cotton';
  const priceRaw = (formData.get('price') as string)?.trim() || '';
  const originalPriceRaw = (formData.get('originalPrice') as string)?.trim() || '';
  const description = (formData.get('description') as string)?.trim() || '';
  const descriptionUrduRaw = (formData.get('descriptionUrdu') as string)?.trim() || '';
  const descriptionUrdu = descriptionUrduRaw.length > 0 ? descriptionUrduRaw : null;
  const descriptionArabicRaw = (formData.get('descriptionArabic') as string)?.trim() || '';
  const descriptionArabic = descriptionArabicRaw.length > 0 ? descriptionArabicRaw : null;
  const royalTale = (formData.get('royalTale') as string)?.trim() || '';
  const texture = (formData.get('texture') as string)?.trim() || 'Fine Weave';
  const recommendedUse = (formData.get('recommendedUse') as string)?.trim() || 'Royal Formal & Daily Wear';
  const careInstructions = (formData.get('careInstructions') as string)?.trim() || 'Dry clean recommended.';
  const meters = (formData.get('meters') as string)?.trim() || '4.5 Meters (56" Width)';
  const inStock = formData.get('inStock') === 'true' || formData.get('inStock') === 'on';
  const isFeatured = formData.get('isFeatured') === 'true' || formData.get('isFeatured') === 'on';
  const colorName = (formData.get('colorName') as string)?.trim() || '';
  const weaveType = (formData.get('weaveType') as string)?.trim() || '';

  // Parse images JSON array
  let imageUrls: string[] = [];
  const imagesRaw = formData.get('images') as string;
  if (imagesRaw) {
    try {
      imageUrls = JSON.parse(imagesRaw);
    } catch {
      imageUrls = imagesRaw.split(',').map((u) => u.trim()).filter(Boolean);
    }
  }

  // Field validation
  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 3) {
    fieldErrors.name = 'Fabric name must be at least 3 characters.';
  }

  const price = parseInt(priceRaw, 10);
  if (isNaN(price) || price <= 0) {
    fieldErrors.price = 'Please enter a valid price in PKR.';
  }

  if (!fabricType) {
    fieldErrors.fabricType = 'Fabric type is required.';
  }

  if (!description || description.length < 10) {
    fieldErrors.description = 'Please enter a descriptive overview of the fabric (min 10 characters).';
  }

  if (descriptionUrdu && descriptionUrdu.length > 2000) {
    fieldErrors.descriptionUrdu = 'Urdu description must not exceed 2000 characters.';
  }

  if (descriptionArabic && descriptionArabic.length > 2000) {
    fieldErrors.descriptionArabic = 'Arabic description must not exceed 2000 characters.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  const primaryImage =
    imageUrls[0] ||
    'https://picsum.photos/seed/smf-fabric-new/900/1200';
  const secondaryImage = imageUrls[1] || primaryImage;

  const slug = generateSlug(name);
  const collectionSlug = getCollectionSlug(collection);

  try {
    const newProduct = await createCatalogProduct({
      slug,
      name,
      collection,
      collectionSlug,
      fabricType,
      price,
      originalPrice: originalPriceRaw ? parseInt(originalPriceRaw, 10) : undefined,
      availability: inStock ? 'IN STOCK' : 'OUT OF STOCK',
      image: primaryImage,
      secondaryImage,
      images: JSON.stringify(imageUrls.length > 0 ? imageUrls : [primaryImage]),
      inStock,
      description,
      descriptionUrdu,
      descriptionArabic,
      royalTale: royalTale || `Crafted by the royal weavers of Lahore for the distinguished patron.`,
      texture,
      recommendedUse,
      careInstructions,
      meters,
      isFeatured,
      colorName: colorName || undefined,
      weaveType: weaveType || undefined,
    });

    // Revalidate affected routes
    revalidatePath('/admin/products');
    revalidatePath('/collections');
    revalidatePath(`/collections/${collectionSlug}`);
    revalidatePath(`/product/${slug}`);
    revalidatePath('/');

    return {
      success: true,
      productId: newProduct.id,
      slug: newProduct.slug,
    };
  } catch (err) {
    console.error('createProduct error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to create product in database.',
    };
  }
}

/**
 * Server Action: Update Product with modified attributes and image URLs
 */
export async function updateProduct(
  productId: number,
  formData: FormData
): Promise<AdminProductActionState> {
  const auth = await checkAdminAuth();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  const existing = await getProductById(productId);
  if (!existing) {
    return { success: false, error: 'Product not found.' };
  }

  const name = (formData.get('name') as string)?.trim() || existing.name;
  const collection = (formData.get('collection') as string)?.trim() || existing.collection || 'Haibat Majmua';
  const fabricType = (formData.get('fabricType') as string)?.trim() || existing.fabricType;
  const priceRaw = (formData.get('price') as string)?.trim();
  const originalPriceRaw = (formData.get('originalPrice') as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || existing.description;
  const hasUrduField = formData.has('descriptionUrdu');
  const descriptionUrduRaw = (formData.get('descriptionUrdu') as string)?.trim() || '';
  const descriptionUrdu = hasUrduField
    ? descriptionUrduRaw.length > 0
      ? descriptionUrduRaw
      : null
    : existing.descriptionUrdu;
  const hasArabicField = formData.has('descriptionArabic');
  const descriptionArabicRaw = (formData.get('descriptionArabic') as string)?.trim() || '';
  const descriptionArabic = hasArabicField
    ? descriptionArabicRaw.length > 0
      ? descriptionArabicRaw
      : null
    : existing.descriptionArabic;
  const royalTale = (formData.get('royalTale') as string)?.trim() ?? existing.royalTale;
  const texture = (formData.get('texture') as string)?.trim() || existing.texture;
  const recommendedUse = (formData.get('recommendedUse') as string)?.trim() || existing.recommendedUse;
  const careInstructions = (formData.get('careInstructions') as string)?.trim() || existing.careInstructions;
  const meters = (formData.get('meters') as string)?.trim() || existing.meters;
  const inStock = formData.get('inStock') === 'true' || formData.get('inStock') === 'on';
  const isFeatured = formData.get('isFeatured') === 'true' || formData.get('isFeatured') === 'on';

  const price = priceRaw ? parseInt(priceRaw, 10) : existing.price;
  const originalPrice = originalPriceRaw ? parseInt(originalPriceRaw, 10) : existing.originalPrice || undefined;

  let imageUrls: string[] = [];
  const imagesRaw = formData.get('images') as string;
  if (imagesRaw) {
    try {
      imageUrls = JSON.parse(imagesRaw);
    } catch {
      imageUrls = imagesRaw.split(',').map((u) => u.trim()).filter(Boolean);
    }
  }

  const primaryImage = imageUrls.length > 0 ? imageUrls[0] : existing.image;
  const secondaryImage = imageUrls.length > 1 ? imageUrls[1] : existing.secondaryImage || primaryImage;

  const collectionSlug = getCollectionSlug(collection);

  try {
    const updated = await updateCatalogProduct(productId, {
      name,
      collection,
      collectionSlug,
      fabricType,
      price,
      originalPrice,
      availability: inStock ? 'IN STOCK' : 'OUT OF STOCK',
      image: primaryImage,
      secondaryImage,
      images: JSON.stringify(imageUrls.length > 0 ? imageUrls : [primaryImage]),
      inStock,
      description,
      descriptionUrdu,
      descriptionArabic,
      royalTale,
      texture,
      recommendedUse,
      careInstructions,
      meters,
      isFeatured,
    });

    if (!updated) {
      return { success: false, error: 'Could not update product.' };
    }

    revalidatePath('/admin/products');
    revalidatePath('/collections');
    revalidatePath(`/collections/${collectionSlug}`);
    revalidatePath(`/product/${existing.slug}`);
    revalidatePath('/');

    return {
      success: true,
      productId: updated.id,
      slug: updated.slug,
    };
  } catch (err) {
    console.error('updateProduct error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update product.',
    };
  }
}

/**
 * Server Action: Deletes product record and cleans up Cloudinary assets
 */
export async function deleteProduct(productId: number): Promise<{ success: boolean; error?: string }> {
  const auth = await checkAdminAuth();
  if (!auth.authorized) {
    return { success: false, error: auth.error };
  }

  try {
    const product = await getProductById(productId);
    if (!product) {
      return { success: false, error: 'Product not found.' };
    }

    // Attempt to delete Cloudinary images if they reside in Cloudinary
    if (product.images) {
      try {
        const urls: string[] = JSON.parse(product.images);
        for (const url of urls) {
          if (url.includes('res.cloudinary.com')) {
            await deleteFromCloudinary(url);
          }
        }
      } catch {
        // non-blocking
      }
    }

    await deleteCatalogProduct(productId);

    revalidatePath('/admin/products');
    revalidatePath('/collections');
    revalidatePath('/');

    return { success: true };
  } catch (err) {
    console.error('deleteProduct error:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to delete product.',
    };
  }
}
