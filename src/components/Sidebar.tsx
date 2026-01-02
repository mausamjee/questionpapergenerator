'use client';

import React from 'react';
import {
 PlusCircle,
 LayoutGrid,
 FileText,
 Settings,
 HelpCircle,
 GraduationCap,
 LogOut,
 FolderOpen,
 Beaker,
 Atom,
 Database,
 FileJson
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({
 icon: Icon,
 label,
 href,
 active
}: {
 icon: any,
 label: string,
 href: string,
 active?: boolean
}) => {
 return (
  <Link
   href={href}
   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
    ? 'bg-blue-50 text-blue-600 shadow-sm'
    : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
   <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
   <span className="font-semibold text-sm">{label}</span>
  </Link>
 );
};

export const Sidebar = () => {
 const pathname = usePathname();

 return (
  <aside className="no-print w-64 border-r border-slate-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-50">
   <div className="p-6">
    <div className="flex items-center gap-3 mb-10">
     <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100 ring-4 ring-blue-50">
      <GraduationCap className="text-white w-6 h-6" />
     </div>
     <div>
      <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none">ExamGenius</h1>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Administrator</p>
     </div>
    </div>

    <nav className="space-y-2">
     <NavItem
      icon={PlusCircle}
      label="Create New Paper"
      href="/create-paper"
      active={pathname === '/create-paper'}
     />
     <NavItem
      icon={LayoutGrid}
      label="Dashboard"
      href="/dashboard"
      active={pathname === '/dashboard'}
     />
     <NavItem
      icon={Beaker}
      label="Chemistry"
      href="/chemistry"
      active={pathname === '/chemistry'}
     />
     <NavItem
      icon={Atom}
      label="Physics"
      href="/physics"
      active={pathname === '/physics'}
     />
     <NavItem
      icon={Database}
      label="Upload Question"
      href="/upload"
      active={pathname === '/upload'}
     />
     <NavItem
      icon={FileJson}
      label="Bulk Upload JSON"
      href="/upload-json"
      active={pathname === '/upload-json'}
     />
     <NavItem
      icon={Settings}
      label="Settings"
      href="#"
     />
     <NavItem
      icon={FolderOpen}
      label="My Papers"
      href="#"
     />
    </nav>
   </div>

   <div className="mt-auto p-6 space-y-4">
    <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all w-full group">
     <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
     <span className="font-bold text-sm">Log Out</span>
    </button>
   </div>
  </aside>
 );
};
