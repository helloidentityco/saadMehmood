'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { deleteProduct } from '@/actions/admin-products';
import { useLoading } from '@/components/providers/LoadingContext';

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { withSkeleton } = useLoading();

  const handleDelete = () => {
    setDeleteError(null);
    startTransition(async () => {
      await withSkeleton(
        async () => {
          try {
            const res = await deleteProduct(productId);
            if (res.success) {
              setIsOpen(false);
              router.refresh();
            } else {
              setDeleteError(res.error || 'Failed to delete product.');
            }
          } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Error deleting product.');
          }
        },
        `Removing "${productName}" from Catalog...`,
        'delete'
      );
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDeleteError(null);
          setIsOpen(true);
        }}
        className="p-1.5 text-[#888888] hover:text-red-400 hover:bg-red-950/30 transition-colors"
        title={`Delete ${productName}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#2E2E2E] max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm uppercase tracking-wider text-[#F5F5F5] font-light">
              Confirm Fabric Removal
            </h3>
            <p className="text-xs text-[#888888] font-light leading-relaxed">
              Are you sure you wish to delete{' '}
              <span className="text-[#C5A059] font-medium">{productName}</span> from the
              Atelier catalog and clean up Cloudinary assets? This action cannot be undone.
            </p>

            {deleteError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{deleteError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-2 text-xs uppercase tracking-wider text-[#AAAAAA] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleDelete}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-red-900 hover:bg-red-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
