import React from 'react';
import { XIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { Invoice } from '../../utils/mockData';
import { formatKES } from '../../utils/currency';
type InvoiceViewerProps = {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
};
export function InvoiceViewer({
  invoice,
  isOpen,
  onClose
}: InvoiceViewerProps) {
  if (!isOpen) return null;
  // Generate mock data for the invoice display
  const invoiceData = {
    dateCreated: new Date(invoice.uploadDate).toLocaleString('en-KE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    invoiceNo: Math.floor(Math.random() * 100),
    scuId: 'KRASRN000258315',
    receiptSignature: 'Z0BC7R8RNI0T2J',
    cuInvoiceNumber: invoice.invoiceNumber,
    saleFrom: 'Healthcare Provider',
    saleTo: invoice.insurerName,
    saleFromDetails: {
      name: 'NAIROBI MEDICAL CENTRE',
      pin: 'A001972400X',
      email: 'admin@nairobimedical.co.ke',
      address: '4591-00506, Nairobi, Kenya'
    },
    saleToDetails: {
      name: invoice.insurerName.toUpperCase(),
      pin: 'P052130917F',
      email: `info@${invoice.insurerName.toLowerCase().replace(/\s+/g, '')}.com`,
      address: 'East of Nairobi',
      phone: '+254722813946'
    },
    items: [{
      name: invoice.serviceDescription,
      qty: 1,
      price: invoice.amount,
      taxType: 'NON VAT',
      tax: 0,
      discount: 0,
      total: invoice.amount
    }],
    paymentMethod: 'mpesa',
    taxableAmount: invoice.amount,
    vat: 0,
    subtotal: invoice.amount,
    totalVat: 0,
    totalDiscount: 0,
    totalAmount: invoice.amount
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-gray-900/75 transition-opacity" onClick={onClose} aria-hidden="true" />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Invoice Preview
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Print invoice">
                <PrinterIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => console.log('Download functionality to be implemented')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Download invoice">
                <DownloadIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
                <XIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-8">
            <div className="bg-white border border-gray-300 rounded-lg p-8 font-sans">
              {/* Header with decorative elements */}
              <div className="relative mb-8">
                {/* Decorative wave pattern (top) */}
                <div className="absolute top-0 right-0 w-48 h-24 opacity-10">
                  <svg viewBox="0 0 200 100" className="text-red-400">
                    <path d="M0,50 Q25,25 50,50 T100,50 T150,50 T200,50 L200,0 L0,0 Z" fill="currentColor" />
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded" />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        Invoice
                      </h1>
                      <p className="text-sm text-gray-600">
                        Date Created: {invoiceData.dateCreated}
                      </p>
                      <p className="text-xs text-gray-500">
                        Invoice No: {invoiceData.invoiceNo} | SCU ID:{' '}
                        {invoiceData.scuId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-24 h-24 border-2 border-gray-900 p-1">
                      {/* QR Code placeholder */}
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-0.5 w-16 h-16">
                          {[...Array(9)].map((_, i) => <div key={i} className="bg-white" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <p className="text-sm text-gray-600">
                    Receipt Signature:{' '}
                    <span className="font-mono">
                      {invoiceData.receiptSignature}
                    </span>
                  </p>
                </div>
              </div>

              {/* Sale From/To Section */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="bg-gray-800 text-white px-3 py-1.5 rounded-t text-sm font-medium">
                    Sale From:
                  </div>
                  <div className="border border-gray-300 border-t-0 rounded-b p-4 bg-gray-50">
                    <p className="font-semibold text-gray-900">
                      {invoiceData.saleFromDetails.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      PIN: {invoiceData.saleFromDetails.pin}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoiceData.saleFromDetails.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoiceData.saleFromDetails.address}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800 text-white px-3 py-1.5 rounded-t text-sm font-medium">
                    Sale To:
                  </div>
                  <div className="border border-gray-300 border-t-0 rounded-b p-4 bg-gray-50">
                    <p className="font-semibold text-gray-900">
                      {invoiceData.saleToDetails.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      PIN: {invoiceData.saleToDetails.pin}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoiceData.saleToDetails.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoiceData.saleToDetails.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoiceData.saleToDetails.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-gray-800 text-white px-3 py-1.5 rounded-t text-sm font-medium">
                  CU Invoice Number:
                </div>
                <div className="border border-gray-300 border-t-0 rounded-b p-3 bg-gray-50">
                  <p className="font-mono font-semibold text-gray-900">
                    {invoiceData.cuInvoiceNumber}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Amounts are in KES</p>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        Item
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">
                        Qty
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold">
                        Price
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">
                        Tax Type
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold">
                        Tax
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold">
                        Discount
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => <tr key={index}>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {item.name}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center text-sm tabular-nums">
                          {item.qty.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm tabular-nums">
                          KES{' '}
                          {item.price.toLocaleString('en-KE', {
                        minimumFractionDigits: 2
                      })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                          {item.taxType}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm tabular-nums">
                          KES{' '}
                          {item.tax.toLocaleString('en-KE', {
                        minimumFractionDigits: 2
                      })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm tabular-nums">
                          KES{' '}
                          {item.discount.toLocaleString('en-KE', {
                        minimumFractionDigits: 2
                      })}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold tabular-nums">
                          KES{' '}
                          {item.total.toLocaleString('en-KE', {
                        minimumFractionDigits: 2
                      })}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-1">
                  Number of Items: {invoiceData.items.length}
                </p>
              </div>

              {/* Payment & Totals */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">
                    Payment Method:
                  </p>
                  <p className="text-sm text-gray-600">
                    {invoiceData.paymentMethod}
                  </p>
                  <p className="font-semibold text-gray-900 mt-4 mb-2">
                    Terms & Conditions:
                  </p>
                  <p className="font-semibold text-gray-900 mt-4">Note:</p>
                </div>

                <div>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-1 text-sm text-gray-600">Rate</td>
                        <td className="py-1 text-sm text-right font-semibold">
                          Taxable Amount
                        </td>
                        <td className="py-1 text-sm text-right font-semibold">
                          VAT
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 text-sm text-gray-600">NON VAT</td>
                        <td className="py-1 text-sm text-right tabular-nums">
                          {invoiceData.taxableAmount.toFixed(2)}
                        </td>
                        <td className="py-1 text-sm text-right tabular-nums">
                          {invoiceData.vat.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border-t border-gray-300">
                        <td className="py-2 text-sm font-semibold">Subtotal</td>
                        <td className="py-2 text-sm text-right font-bold tabular-nums" colSpan={2}>
                          {formatKES(invoiceData.subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 text-sm font-semibold">
                          Total VAT
                        </td>
                        <td className="py-1 text-sm text-right tabular-nums" colSpan={2}>
                          {invoiceData.totalVat.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 text-sm font-semibold">
                          Total Discount
                        </td>
                        <td className="py-1 text-sm text-right tabular-nums" colSpan={2}>
                          {invoiceData.totalDiscount.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="border-t-2 border-gray-900">
                        <td className="py-2 text-base font-bold">
                          Total Amount
                        </td>
                        <td className="py-2 text-base text-right font-bold tabular-nums" colSpan={2}>
                          {formatKES(invoiceData.totalAmount)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* eTIMS Logo */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">e</span>
                  <span className="text-2xl font-bold text-red-600">T</span>
                  <span className="text-2xl font-bold text-gray-900">i</span>
                  <span className="text-2xl font-bold text-red-600">MS</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-gray-600 border-t border-gray-300 pt-4">
                THIS IS A VALID COMPUTER-GENERATED DOCUMENT ISSUED UNDER
                ECITIZEN AND THE KENYA REVENUE AUTHORITY.
              </div>

              {/* Decorative wave pattern (bottom) */}
              <div className="relative mt-8 h-16 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-16 opacity-10">
                  <svg viewBox="0 0 1200 100" className="text-red-400 w-full h-full">
                    <path d="M0,50 Q150,25 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}