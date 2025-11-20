import React from 'react';
import { X, ArrowRight, Tag, Trophy, User } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-brand-dark border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-brand-yellow hover:text-black transition-colors z-10">
          <X size={24} />
        </button>

        {/* Left Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
             <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent md:bg-gradient-to-r"></div>
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
                <span className="inline-block py-1 px-3 rounded bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
                    {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                    {project.title}
                </h2>
                <div className="h-1 w-20 bg-brand-yellow mt-4"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-bold">
                        <User size={14} /> Khách Hàng
                    </div>
                    <div className="text-white font-bold">{project.client}</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-bold">
                        <Trophy size={14} /> Kết Quả
                    </div>
                    <div className="text-brand-yellow font-black text-lg">{project.result}</div>
                </div>
            </div>

            <div className="prose prose-invert prose-sm max-w-none mb-8 text-gray-300 leading-relaxed">
                <h4 className="text-white font-bold uppercase text-sm mb-2">Chi Tiết Dự Án</h4>
                <p>{project.description}</p>
            </div>

            <div className="mt-auto">
                <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-brand-yellow transition-colors flex items-center justify-center gap-2">
                    Xem Website Thực Tế <ArrowRight size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;