import React from 'react';
import Certificate from './_components/Certificate';

interface CertificateData {
  logo: string;
  name: string;
  course: string;
  dateOfConductStart?: string;
  dateOfConductEnd?: string;  
  signature: string;
  signatureDetails: string;
}

const data: CertificateData = {
  logo: 'https://seeklogo.com/images/S/shahjalal-university-of-science-and-technology-logo-F34BC01F81-seeklogo.com.png',
  name: 'Nayem Islam',
  course: 'Java 17 Masterclass: Start Coding in 2024',
  dateOfConductStart: '2024-04-17',
  dateOfConductEnd: '2024-04-17',
  signature: 'https://a.storyblok.com/f/191576/1200x800/b7ad4902a2/signature_maker_after_.webp',
  signatureDetails: 'Head, SUST CSE',
};

const CertificateGenerator = () => {
  return (
    <Certificate
      logo={data.logo}
      name={data.name}
      course={data.course}
      dateOfConductStart={data.dateOfConductStart}
      dateOfConductEnd={data.dateOfConductEnd}
      signature={data.signature}
      signatureDetails={data.signatureDetails}
    />
  );
};

export default CertificateGenerator;
