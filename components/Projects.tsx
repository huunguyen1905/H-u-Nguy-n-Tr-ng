
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Aurora Finance",
    category: "Branding & UI/UX",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Neon Energy",
    category: "Chiến Lược Marketing",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Vogue Estate",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Cyber Punk Game",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
  }
];

const Projects: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dự Án Tiêu Biểu</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Kiệt Tác <span className="text-gray-600">Số</span>
            </h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors uppercase tracking-widest text-sm font-bold">
            Xem Tất Cả Dự Án <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer">
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.category}</p>
                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">{project.title}</h4>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45 group-hover:rotate-0">
                    <ArrowUpRight size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <button className="inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors uppercase tracking-widest text-sm font-bold">
            Xem Tất Cả Dự Án <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
