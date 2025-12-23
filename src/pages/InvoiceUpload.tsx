import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FileUpload } from '../components/ui/FileUpload';
import { invoiceService } from '../services/invoiceService';
type UploadStep = 'upload' | 'review' | 'success';
type FormData = {
  invoiceNumber: string;
  patientName: string;
  insurerName: string;
  amount: string;
  dueDate: string;
  serviceDescription: string;
};
export function InvoiceUpload() {
  const navigate = useNavigate();
  const [step, setStep] = useState<UploadStep>('upload');
  const [files, setFiles] = useState<Array<{
    file: File;
    status: string;
    ocrData?: Record<string, string>;
  }>>([]);
  const [formData, setFormData] = useState<FormData>({
    invoiceNumber: '',
    patientName: '',
    insurerName: '',
    amount: '',
    dueDate: '',
    serviceDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const handleFilesChange = (uploadedFiles: typeof files) => {
    setFiles(uploadedFiles);
    // Auto-populate form with OCR data from first completed file
    const completedFile = uploadedFiles.find(f => f.status === 'complete' && f.ocrData);
    if (completedFile?.ocrData) {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: completedFile.ocrData?.invoiceNumber || prev.invoiceNumber,
        amount: completedFile.ocrData?.amount?.replace(/[^0-9]/g, '') || prev.amount
      }));
    }
  };
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  const handleContinue = () => {
    if (step === 'upload' && files.some(f => f.status === 'complete')) {
      setStep('review');
    }
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const invoiceData = {
        invoice_number: formData.invoiceNumber,
        patientName: formData.patientName,
        insurerName: formData.insurerName,
        amount: formData.amount,
        due_date: formData.dueDate,
        serviceDescription: formData.serviceDescription,
      };

      if (files.length > 0) {
        // Upload with file
        const result = await invoiceService.uploadInvoiceFile(files[0].file, invoiceData);
        console.log('Invoice created:', result);
      } else {
        // Create without file
        await invoiceService.createInvoice(invoiceData);
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit invoice');
    } finally {
      setIsSubmitting(false);
    }
  };
  const isFormValid = formData.invoiceNumber && formData.patientName && formData.insurerName && formData.amount && formData.dueDate && formData.serviceDescription;
  const renderStepIndicator = () => <div className="flex items-center justify-center gap-2 mb-8">
      {(['upload', 'review', 'success'] as const).map((s, index) => <Fragment key={s}>
          <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${step === s || step === 'success' && index < 2 ? 'bg-primary-500 text-white' : step === 'review' && s === 'upload' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}
            `}>
            {index + 1}
          </div>
          {index < 2 && <div className={`w-12 h-0.5 ${step === 'review' && index === 0 || step === 'success' ? 'bg-primary-500' : 'bg-gray-200'}`} />}
        </Fragment>)}
    </div>;
  if (step === 'success') {
    return <PageContainer>
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Invoice Submitted!
          </h2>
          <p className="text-gray-600 mb-8">
            Your invoice has been submitted for review. You'll receive a
            notification once it's approved.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={() => navigate('/invoices')}>
              View All Invoices
            </Button>
            <Button onClick={() => {
            setStep('upload');
            setFiles([]);
            setFormData({
              invoiceNumber: '',
              patientName: '',
              insurerName: '',
              amount: '',
              dueDate: '',
              serviceDescription: ''
            });
          }}>
              Upload Another
            </Button>
          </div>
        </div>
      </PageContainer>;
  }
  return <PageContainer title="Upload Invoice" subtitle="Submit your eTIMS invoices for funding" actions={<Button variant="ghost" onClick={() => navigate('/invoices')} icon={<ArrowLeftIcon className="w-4 h-4" />}>
          Back to Invoices
        </Button>}>
      {renderStepIndicator()}

      <div className="max-w-2xl mx-auto">
        {step === 'upload' && <Card>
            <CardHeader>
              <CardTitle>Upload eTIMS Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onFilesChange={handleFilesChange} accept=".pdf,.png,.jpg,.jpeg" maxFiles={5} />

              {files.some(f => f.status === 'complete') && <div className="mt-6 pt-6 border-t border-gray-100">
                  <Button onClick={handleContinue} fullWidth>
                    Continue to Review
                  </Button>
                </div>}
            </CardContent>
          </Card>}

        {step === 'review' && <Card>
            <CardHeader>
              <CardTitle>Review Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                Review and confirm the extracted invoice details. You can edit
                any field if needed.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Invoice Number" value={formData.invoiceNumber} onChange={handleInputChange('invoiceNumber')} placeholder="INV-2024-001" required />
                  <Input label="Amount (KES)" type="number" value={formData.amount} onChange={handleInputChange('amount')} placeholder="50000" required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Patient Name" value={formData.patientName} onChange={handleInputChange('patientName')} placeholder="John Kamau" required />
                  <Input label="Insurer" value={formData.insurerName} onChange={handleInputChange('insurerName')} placeholder="Jubilee Insurance" required />
                </div>

                <Input label="Due Date" type="date" value={formData.dueDate} onChange={handleInputChange('dueDate')} required />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Description <span className="text-red-500">*</span>
                  </label>
                  <textarea value={formData.serviceDescription} onChange={handleInputChange('serviceDescription')} placeholder="Describe the medical services provided..." rows={3} className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                <Button variant="secondary" onClick={() => setStep('upload')} fullWidth>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!isFormValid} loading={isSubmitting} fullWidth>
                  Submit Invoice
                </Button>
              </div>
            </CardContent>
          </Card>}
      </div>
    </PageContainer>;
}