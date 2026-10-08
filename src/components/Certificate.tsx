import React, { useRef } from 'react';
import { Candidate } from '../contexts/AppContext';

interface CertificateProps {
  candidate: Candidate;
  level: number;
  score: number;
  completionDate: string;
  companyName?: string;
  companyLogo?: string;
  onClose: () => void;
}

export default function Certificate({ candidate, level, score, completionDate, companyName, companyLogo, onClose }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const levelTitles: Record<number, string> = {
    1: 'HACCP Awareness',
    2: 'HACCP Fundamentals',
    3: 'HACCP Implementation',
    4: 'HACCP Advanced',
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDownload = () => {
    const element = certRef.current;
    if (!element) return;

    // Create a canvas from the certificate
    const canvas = document.createElement('canvas');
    const scale = 2;
    canvas.width = element.offsetWidth * scale;
    canvas.height = element.offsetHeight * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, element.offsetWidth, element.offsetHeight);

    // Draw certificate content
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    // Border
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    // Company logo area
    if (companyLogo) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, width / 2 - 40, 50, 80, 80);
        drawText(ctx, width, height);
      };
      img.src = companyLogo;
    } else {
      drawText(ctx, width, height);
    }

    function drawText(ctx: CanvasRenderingContext2D, w: number, h: number) {
      // Title
      ctx.fillStyle = '#1e3a5f';
      ctx.font = 'bold 32px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', w / 2, companyLogo ? 160 : 100);

      // Subtitle
      ctx.font = '16px Arial, sans-serif';
      ctx.fillStyle = '#555';
      ctx.fillText('This is to certify that', w / 2, companyLogo ? 200 : 140);

      // Name
      ctx.font = 'bold 28px Georgia, serif';
      ctx.fillStyle = '#1e3a5f';
      ctx.fillText(candidate.name, w / 2, companyLogo ? 245 : 185);

      // Has completed
      ctx.font = '16px Arial, sans-serif';
      ctx.fillStyle = '#555';
      ctx.fillText('has successfully completed', w / 2, companyLogo ? 280 : 220);

      // Level
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText(`HACCP Training - Level ${level}: ${levelTitles[level]}`, w / 2, companyLogo ? 320 : 260);

      // Score
      ctx.font = '16px Arial, sans-serif';
      ctx.fillStyle = '#555';
      ctx.fillText(`with a score of ${score}%`, w / 2, companyLogo ? 355 : 295);

      // Date
      ctx.fillText(`Completed on: ${formatDate(completionDate)}`, w / 2, companyLogo ? 385 : 325);

      // Footer
      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#888';
      ctx.fillText('Designed and created by Gyan Chnadra, nscgyan@live.com', w / 2, h - 45);

      // Company name if exists
      if (companyName) {
        ctx.font = '14px Arial, sans-serif';
        ctx.fillStyle = '#333';
        ctx.fillText(companyName, w / 2, companyLogo ? 355 : 295);
      }

      // Download the canvas
      const link = document.createElement('a');
      link.download = `HACCP_Certificate_Level${level}_${candidate.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-auto">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-xl font-bold text-gray-800">Certificate Preview</h3>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              ⬇ Download Certificate
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
              ✕ Close
            </button>
          </div>
        </div>
        <div className="p-8 flex justify-center">
          <div ref={certRef} className="w-full max-w-3xl bg-white border-4 border-[#1e3a5f] relative" style={{ aspectRatio: '4/3' }}>
            {/* Inner border */}
            <div className="absolute inset-3 border-2 border-[#c9a227]"></div>
            
            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
              {/* Company Logo */}
              {companyLogo && (
                <img src={companyLogo} alt="Company Logo" className="w-20 h-20 object-contain mb-4" />
              )}

              {/* Company Name */}
              {companyName && (
                <p className="text-lg font-semibold text-gray-700 mb-2">{companyName}</p>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] font-serif mb-4">
                CERTIFICATE OF COMPLETION
              </h1>

              <p className="text-gray-600 mb-2">This is to certify that</p>

              {/* Candidate Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] font-serif mb-4 border-b-2 border-[#c9a227] pb-2">
                {candidate.name}
              </h2>

              <p className="text-gray-600 mb-2">has successfully completed</p>

              {/* Level */}
              <h3 className="text-xl md:text-2xl font-bold text-[#c9a227] mb-3">
                HACCP Training - Level {level}: {levelTitles[level]}
              </h3>

              <p className="text-gray-600 mb-1">with a score of <span className="font-bold text-[#1e3a5f]">{score}%</span></p>
              <p className="text-gray-600 mb-6">Completed on: {formatDate(completionDate)}</p>

              {/* Signature area */}
              <div className="flex justify-between w-full max-w-md mt-4">
                <div className="text-center">
                  <div className="w-32 border-b border-gray-400 mb-1"></div>
                  <p className="text-xs text-gray-500">Authorized Signature</p>
                </div>
                <div className="text-center">
                  <div className="w-32 border-b border-gray-400 mb-1"></div>
                  <p className="text-xs text-gray-500">HACCP Training Director</p>
                </div>
              </div>

              {/* Footer */}
              <p className="text-xs text-gray-500 mt-6 absolute bottom-6">
                Designed and created by Gyan Chnadra, nscgyan@live.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
