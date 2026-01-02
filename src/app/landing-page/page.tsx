'use client';

import React from 'react';
import Link from 'next/link';
import {
 CheckCircle2,
 ChevronRight,
 Layers,
 Database,
 Printer,
 MousePointer2,
 Settings2,
 Download,
 Star,
 GraduationCap,
 Menu,
 X
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
 <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
   <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
  </div>
  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
  <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
 </div>
);

const StepItem = ({ number, title, description, icon: Icon }: { number: number, title: string, description: string, icon: any }) => (
 <div className="flex flex-col items-center text-center max-w-xs relative z-10">
  <div className="w-16 h-16 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm relative group">
   <Icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
   <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-slate-50">
    {number}
   </div>
  </div>
  <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
  <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
 </div>
);

export default function LandingPage() {
 const [isMenuOpen, setIsMenuOpen] = React.useState(false);

 return (
  <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-600">
   {/* Navbar */}
   <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-50">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
     <div className="flex items-center gap-2">
      <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
       <GraduationCap className="text-white w-6 h-6" />
      </div>
      <span className="text-xl font-black text-slate-900 tracking-tight">ExamCraft</span>
     </div>

     {/* Desktop Nav */}
     <div className="hidden md:flex items-center gap-8">
      <Link href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">How it Works</Link>
      <Link href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
      <div className="h-4 w-[1px] bg-slate-200" />
      <Link href="#" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Log In</Link>
      <Link href="/dashboard" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-100 pulse-glow">
       Get Started
      </Link>
     </div>

     {/* Mobile Menu Toggle */}
     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600">
      {isMenuOpen ? <X /> : <Menu />}
     </button>
    </div>

    {/* Mobile Nav Menu */}
    {isMenuOpen && (
     <div className="md:hidden bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col gap-4">
       <Link href="#" className="text-sm font-bold text-slate-600">How it Works</Link>
       <Link href="#" className="text-sm font-bold text-slate-600">Pricing</Link>
       <Link href="#" className="text-sm font-bold text-slate-600">Log In</Link>
       <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl text-center">
        Get Started
       </Link>
      </div>
     </div>
    )}
   </nav>

   {/* Hero Section */}
   <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
     <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-700">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100 shadow-sm shadow-blue-50">
       <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
       </span>
       New Question Bank Added
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
       Create Professional <span className="text-blue-600">Question Papers</span> in Minutes
      </h1>

      <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
       For CBSE, State Boards, and Coaching Institutes. Access 10,000+ curated questions and generate print-ready PDFs instantly.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
       <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
        Create Your First Paper
        <ChevronRight className="w-5 h-5" />
       </Link>
       <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all hover:border-slate-300">
        View Sample PDF
       </button>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
       <div className="flex -space-x-4">
        {[1, 2, 3, 4].map(i => (
         <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden ring-1 ring-slate-100">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
         </div>
        ))}
        <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-blue-100">
         500+
        </div>
       </div>
       <div className="text-left">
        <div className="flex gap-0.5 text-amber-400 mb-0.5">
         {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
        </div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Trusted by 500+ Teachers & Schools</p>
       </div>
      </div>
     </div>

     <div className="flex-1 relative animate-in fade-in slide-in-from-right-8 duration-1000">
      <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-100 border-8 border-white group">
       <img
        src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop"
        alt="Workspace"
        className="w-full object-cover group-hover:scale-105 transition-transform duration-1000"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

       {/* Floating Card */}
       <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 animate-bounce-subtle">
        <div className="flex items-center gap-4">
         <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
         </div>
         <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
          <h4 className="text-sm font-bold text-slate-900">Paper Generated Successfully</h4>
         </div>
        </div>
       </div>
      </div>

      {/* Background elements */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
     </div>
    </div>
   </section>

   {/* Features Section */}
   <section className="py-24 px-6 bg-slate-50/50">
    <div className="max-w-7xl mx-auto">
     <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16">
      <div className="max-w-2xl">
       <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
        Why Teachers Choose ExamCraft
       </h2>
       <p className="text-lg text-slate-500 font-medium">Everything you need to create the perfect exam paper without the stress.</p>
      </div>
      <Link href="#" className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all group">
       View all features
       <ChevronRight className="w-5 h-5" />
      </Link>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
       icon={Layers}
       title="Custom Blueprint"
       description="Set difficulty ratios (Easy/Medium/Hard) effortlessly. You decide the structure, we handle the rest."
      />
      <FeatureCard
       icon={Database}
       title="Huge Database"
       description="Access 10k+ curated questions for Maths, Physics, & Chemistry. Regularly updated for all boards."
      />
      <FeatureCard
       icon={Printer}
       title="Print Ready"
       description="One-click generation of professional A4 PDFs. Formatted perfectly with school header and logo."
      />
     </div>
    </div>
   </section>

   {/* Process Section */}
   <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto text-center">
     <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">Simple Process</p>
     <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 max-w-3xl mx-auto">
      Create a Paper in 3 Simple Steps
     </h2>
     <p className="text-lg text-slate-500 font-medium mb-20 max-w-2xl mx-auto">
      Save hours of typing and formatting. Focus on teaching while we handle the paperwork.
     </p>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
      {/* Connection Line */}
      <div className="absolute top-8 left-1/4 right-1/4 h-[2px] bg-slate-100 -z-0 hidden md:block" />

      <StepItem
       number={1}
       icon={MousePointer2}
       title="Select Class & Subject"
       description="Choose your grade (6-12) and subject. We support CBSE and major State Boards."
      />
      <StepItem
       number={2}
       icon={Settings2}
       title="Customize Blueprint"
       description="Set the number of questions, total marks, and difficulty level distribution."
      />
      <StepItem
       number={3}
       icon={Download}
       title="Print & Download"
       description="Get a perfectly formatted PDF with your school logo and answer key instantly."
      />
     </div>

     <div className="mt-24">
      <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl shadow-blue-200 transition-all active:scale-95 group">
       Try It Now - It's Free
       <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </Link>
     </div>
    </div>
   </section>

   {/* Footer */}
   <footer className="bg-white border-t border-slate-100 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
     <div className="flex items-center gap-2">
      <div className="bg-slate-900 p-1.5 rounded-lg">
       <GraduationCap className="text-white w-5 h-5" />
      </div>
      <span className="text-lg font-black text-slate-900 tracking-tight">ExamCraft</span>
     </div>

     <div className="flex items-center gap-8">
      <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-tight">Privacy Policy</Link>
      <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-tight">Terms of Service</Link>
      <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-tight">Contact Support</Link>
     </div>

     <p className="text-xs font-bold text-slate-400">© 2026 ExamCraft. All rights reserved.</p>
    </div>
   </footer>

   {/* Global styles for animations */}
   <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
      `}</style>
  </div>
 );
}
