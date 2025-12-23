import React from 'react';
import { XIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { Button } from './Button';
type ModalType = 'confirm' | 'warning' | 'success' | 'info';
type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};
const typeConfig: Record<ModalType, {
  icon: React.ReactNode;
  iconBg: string;
  buttonVariant: 'primary' | 'danger';
}> = {
  confirm: {
    icon: <CheckCircleIcon className="w-6 h-6 text-primary-600" />,
    iconBg: 'bg-primary-100',
    buttonVariant: 'primary'
  },
  warning: {
    icon: <AlertTriangleIcon className="w-6 h-6 text-pending-600" />,
    iconBg: 'bg-pending-100',
    buttonVariant: 'danger'
  },
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-success-600" />,
    iconBg: 'bg-success-100',
    buttonVariant: 'primary'
  },
  info: {
    icon: <InfoIcon className="w-6 h-6 text-primary-600" />,
    iconBg: 'bg-primary-100',
    buttonVariant: 'primary'
  }
};
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'confirm',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;
  const config = typeConfig[type];
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-900/50 transition-opacity" onClick={onClose} aria-hidden="true" />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close modal">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center mb-4`}>
              {config.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mb-6">{message}</p>

            <div className="flex gap-3 w-full">
              <Button variant="secondary" onClick={onClose} fullWidth disabled={loading}>
                {cancelText}
              </Button>
              <Button variant={config.buttonVariant} onClick={onConfirm} fullWidth loading={loading}>
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}