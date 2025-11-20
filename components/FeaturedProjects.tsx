import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
        <section id="projects" className="bg-black py-24 border-t border-gray-900">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dự Án Tiêu Biểu</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Chúng Tôi Nói <span className="text-gray-600">Bằng Kết Quả</span>
                    </h3>
                </div>
                <button className="text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors flex items-center gap-2">
                    Xem tất cả dự án <ArrowUpRight size={18} />
                </button>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 200}>
                    <div 
                        className="group cursor-pointer relative"
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6 border border-gray-800">
                            <div className="absolute inset-0 bg-brand-yellow/80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 flex items-center justify-center">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-brand-black font-black text-2xl uppercase border-2 border-black px-6 py-2">Xem Chi Tiết</span>
                                </div>
                            </div>
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded z-20 border border-gray-700">
                                {project.result}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="text-brand-yellow text-xs font-bold uppercase tracking-wider">{project.category} — {project.client}</div>
                            <h4 className="text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors leading-tight">
                                {project.title}
                            </h4>
                        </div>
                    </div>
                </FadeIn>
            ))}
            </div>
        </div>
        </section>

        <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />
    </>
  );
};

export default FeaturedProjects;