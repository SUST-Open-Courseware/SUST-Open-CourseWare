'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

interface CertificateProps {
  logo: string;
  name: string;
  course: string;
  dateOfConductStart?: string;
  dateOfConductEnd?: string;  
  signature: string;
  signatureDetails: string;
}

const Certificate: React.FC<CertificateProps> = ({
  logo,
  name,
  course,
  dateOfConductStart,
  dateOfConductEnd,
  signature,
  signatureDetails,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null); // Type assertion for clarity

  const handleDownloadCertificate = async () => {
    try {
      const canvas = await html2canvas(certificateRef.current!, { scale: 2 });
      const imgData = canvas.toDataURL('image/png', { quality: 1.0 });

      const pdf = new jsPDF('l', 'mm', [1000, 670]);
      const a4Width = 210;

      const imgHeight = (canvas.height / canvas.width) * a4Width;

      pdf.addImage(imgData, 'PNG', 0, 0, a4Width, imgHeight, '', 'FAST');
      pdf.save(`${name.split(' ').join('_')}_certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <div className='m-5'>
        <div
          ref={certificateRef}
          className="bg-amber-50 px-4 py-4 text-center border-[10px] border-double font-mono border-yellow-600 px-4 py-8 flex flex-col items-center"
        >
          <img style={{ width: '120px', height: '120px' }} className="mx-auto mb-4" src={logo} alt="" />
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">CERTIFICATE OF APPRECIATION</h1>
          <span className="text-gray-500 text-sm font-light mb-2">This certificate is proudly awarded to</span>
          <p className="text-xl font-bold mb-4">{name}</p>
          <span className="text-gray-500 text-sm font-light mb-2">for successfully completing the course</span>
          <h2 className="text-xl font-bold mb-4">{course}</h2>
          <span className="text-gray-500 text-sm font-light mb-4">
            {dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'} to{' '}
            {dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}
          </span>
          <div className="flex items-center mb-8">
            <img style={{ width: '80px', height: '70px' }} className="mr-4" src={signature} alt="" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-light">{signatureDetails}</span>
              <hr className="w-20 border-black my-2" />
            </div>
          </div>
        </div>
        <button className="mt-5 button w-full py-2 px-4 text-lg font-medium shadow-md hover:bg-black hover:text-white transition-all" onClick={handleDownloadCertificate}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;
