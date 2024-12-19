import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface DeleteConfirmationOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    object: string;
}

const DeleteConfirmationOverlay: React.FC<DeleteConfirmationOverlayProps> = ({
                                                                                 isOpen,
                                                                                 onClose,
                                                                                 onConfirm,
                                                                                 object,
                                                                             }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                    >
                        <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
                        <p className="mb-6">
                            Are you sure you want to delete "{object}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={onConfirm}>
                                Delete
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmationOverlay;