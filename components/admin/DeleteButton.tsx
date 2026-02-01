'use client';

import { useState, useTransition } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => Promise<void>;
    resourceName: string;
}

export default function DeleteButton({ id, onDelete, resourceName }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDelete = () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        startTransition(async () => {
            try {
                await onDelete(id);
                setIsConfirming(false);
            } catch (error) {
                console.error('Failed to delete', error);
                alert('Failed to delete item');
            }
        });
    };

    if (isPending) {
        return <span className="text-xs text-neutral-500 animate-pulse">Deleting...</span>;
    }

    return (
        <button
            onClick={handleDelete}
            className={`flex items-center gap-1 text-xs transition-colors ${isConfirming
                    ? 'text-red-500 hover:text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded'
                    : 'text-neutral-500 hover:text-red-400'
                }`}
            title={isConfirming ? "Click again to confirm" : `Delete ${resourceName}`}
        >
            <Trash2 size={14} />
            {isConfirming ? 'Confirm?' : ''}
        </button>
    );
}
