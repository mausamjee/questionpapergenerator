import React, { useEffect } from 'react';
import { GeneratedPaper, GenerationConfig, Question } from '@/types';
import { QuestionItem } from './QuestionItem';

interface PaperPreviewProps {
 paper: GeneratedPaper;
 config: GenerationConfig;
 showSolutions: boolean;
 onEditQuestion: (sectionIndex: number, questionIndex: number, question: Question) => void;
}

export const PaperPreview: React.FC<PaperPreviewProps> = ({
 paper,
 config,
 showSolutions,
 onEditQuestion
}) => {
 useEffect(() => {
  const timer = setTimeout(() => {
   if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
    (window as any).MathJax.typesetPromise().catch((err: any) => console.error("MathJax error:", err));
   }
  }, 100);
  return () => clearTimeout(timer);
 }, [paper, showSolutions, config.fontSize]);

 const getRoman = (num: number) => {
  const map: any = { 0: 'i', 1: 'ii', 2: 'iii', 3: 'iv', 4: 'v', 5: 'vi', 6: 'vii', 7: 'viii', 8: 'ix', 9: 'x', 10: 'xi', 11: 'xii' };
  return map[num] || (num + 1).toString();
 };

 return (
  <div className="paper-container relative w-full flex justify-center overflow-hidden print:overflow-visible">
   <div className="scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.75] xl:scale-100 origin-top transition-transform duration-300 print:scale-100 print:transform-none">
    <div
     className="a4-paper bg-white shadow-2xl print:shadow-none font-serif leading-[1.3] relative overflow-hidden print:overflow-visible print:h-auto mx-auto"
     style={{
      fontSize: `${config.fontSize}pt`,
      width: '210mm',
      maxWidth: 'none',
      minHeight: '297mm',
      padding: '20mm'
     }}
    >

     {/* Watermark Rendering */}
     {(config.watermark || config.watermarkImage) && (
      <div className="watermark pointer-events-none absolute top-1/2 left-1/2 select-none z-0 flex items-center justify-center whitespace-nowrap"
       style={{ transform: `translate(-50%, -50%) rotate(${config.watermarkRotation}deg)`, opacity: config.watermarkOpacity }}>
       {config.watermarkImage ? <img src={config.watermarkImage} className="max-w-[400px] max-h-[400px] object-contain grayscale" alt="" /> : <span className="watermark-text font-sans font-black uppercase text-center" style={{ fontSize: '120pt' }}>{config.watermark}</span>}
      </div>
     )}

     {/* Header */}
     <div className="relative z-10">
      <div className="flex justify-between text-[9px] text-slate-400 mb-2 border-b border-slate-100 pb-1 italic no-print">
       <span>Generated: {config.printTimestamp}</span>
       <span className="font-bold">{config.organizationName}</span>
      </div>

      <div className="text-center mb-6 border-b-2 border-double border-slate-900 pb-4">
       <h2 className="text-2xl font-black uppercase tracking-tighter mb-1 leading-tight">{config.headerTitle}</h2>
       <h3 className="text-xl font-black uppercase mb-3">{config.subject}</h3>
       <div className="flex justify-between items-end text-[11pt] font-black border-t-2 border-slate-900 pt-3 px-2">
        <div className="text-left space-y-1">
         <p>Time: {config.timeAllowed}</p>
         <p>Date: {config.testDate}</p>
        </div>
        <div className="text-right">
         {/* Only show max marks if not past year or if calculated */}
         <p>Max. Marks: {paper.totalMarks}</p>
        </div>
       </div>
      </div>
     </div>

     {/* Content */}
     <div className="space-y-4">
      {(() => {
       let mainQCounter = 3; // Start from Q.3 for Section B onwards

       return paper.sections.map((section, sectionIdx) => {
        const isMCQ = section.type === 'MCQ' || section.name.includes('MCQ');
        const isVSA = section.type === 'VSA' || section.name.includes('VSA');
        const isSectionA = isMCQ || isVSA;

        // Determine Headers
        let sectionTitle = "";
        let showSectionHeader = false;
        let subQuestionHeader = null;

        if (isMCQ) {
         sectionTitle = "SECTION - A";
         showSectionHeader = true; // Always show for start of A
         subQuestionHeader = "Q.1 Select and write the correct answer for the following questions:";
        } else if (isVSA) {
         showSectionHeader = false; // Already under Section A
         subQuestionHeader = "Q.2 Answer the following questions:";
        } else {
         // Sections B, C, D
         const nameParts = section.name.split('-');
         sectionTitle = nameParts[0].trim().toUpperCase(); // e.g. "SECTION B"
         // Prevent duplicate section headers if consecutive same sections (rare but good safety)
         const prevSection = paper.sections[sectionIdx - 1];
         const prevTitle = prevSection?.name.split('-')[0].trim().toUpperCase();
         showSectionHeader = sectionTitle !== prevTitle;
        }

        return (
         <div key={section.name + sectionIdx} className="relative mb-4">

          {/* Section Header */}
          {showSectionHeader && (
           <div className="text-center mb-2 mt-4">
            <h4 className="inline-block text-[1.2em] font-black tracking-[0.2em] border-y-2 border-slate-900 py-1 px-8 uppercase">
             {sectionTitle}
            </h4>
           </div>
          )}

          {/* Sub-Group Header (Q.1 / Q.2) */}
          {subQuestionHeader && (
           <div className="mb-2 font-bold text-[1.1em] pl-1">
            {subQuestionHeader}
            <span className="float-right text-[0.9em] font-black">[{section.requiredCount * section.marksPerQuestion}]</span>
           </div>
          )}

          {/* Ordinary Section Details (for Sec B, C, D) */}
          {!isSectionA && (
           <div className="flex justify-between items-baseline mb-2 bg-slate-50/50 print:bg-transparent px-2 border-b border-slate-200 py-1">
            <div className="flex gap-3 items-baseline">
             <span className="font-black text-[1.1em]">{sectionTitle}</span>
             <p className="font-black italic text-[1em]">{section.description}</p>
            </div>
            <span className="font-black text-[1.1em] shrink-0">[{section.requiredCount * section.marksPerQuestion}]</span>
           </div>
          )}

          <div className="space-y-1">
           {section.questions.map((q, qIdx) => {
            // Numbering Logic
            let qLabel = "";
            if (isSectionA) {
             qLabel = `(${getRoman(qIdx)})`; // (i), (ii)...
            } else {
             qLabel = `Q.${mainQCounter++}.`;
            }

            return (
             <QuestionItem
              key={q.id}
              question={q}
              label={qLabel}
              showSolutions={showSolutions}
              config={config}
              onEdit={() => onEditQuestion(sectionIdx, qIdx, q)}
             />
            );
           })}
          </div>
         </div>
        );
       });
      })()}
     </div>

     <div className="mt-12 text-center text-slate-300 text-[10px] italic border-t border-slate-200 pt-6 flex justify-between items-center font-sans">
      <span className="font-bold underline">{config.organizationName}</span>
      <span className="tracking-[1em] uppercase font-black text-slate-400">--- End of Paper ---</span>
      <span className="font-bold">Page 1 of 1</span>
     </div>
    </div>
   </div>
  </div>
 );
};
