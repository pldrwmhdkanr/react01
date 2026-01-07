import React from 'react';

const BentoCard = ({ children, className = "", title, sub }) => (
    <div className={`bento-card p-6 flex flex-col ${className}`}>
        {title && (
            <div className="mb-4">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 opacity-80">{sub}</div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
        )}
        <div className="flex-1 min-h-0 relative">
            {children}
        </div>
    </div>
);

const Bento = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 pt-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Xueyanlei <span className="text-gray-400 font-normal">/ Portfolio</span></h1>
                    <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">Hire Me</button>
                </header>

                {/* Bento Grid 布局 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px]">
                    
                    {/* 1. 个人简介 (2x2) */}
                    <BentoCard className="md:col-span-2 md:row-span-2 !p-8 justify-between bg-white" title="Hello, I'm Xueyanlei." sub="About Me">
                        <p className="text-2xl md:text-3xl leading-snug font-medium text-gray-600 mt-2">
                            A <span className="text-black">Product Designer</span> & <span className="text-black">Developer</span> focusing on creating intuitive digital experiences.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">React</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">Vue</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">Node.js</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">Design</span>
                        </div>
                    </BentoCard>

                    {/* 2. 地图 (1x1) */}
                    <BentoCard className="md:col-span-1 md:row-span-1 bg-blue-50 overflow-hidden !p-0 relative group">
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/116.4074,39.9042,12,0/400x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazl5b...')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                        <div className="absolute bottom-4 left-4 z-10 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                            📍
                        </div>
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">Beijing</div>
                        {/* 模拟地图网格 */}
                        <div className="w-full h-full opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </BentoCard>

                    {/* 3. 社交链接 (1x1) */}
                    <BentoCard className="md:col-span-1 md:row-span-1 bg-black text-white justify-center items-center gap-6">
                        <div className="flex gap-4 text-2xl">
                            <a href="#" className="hover:text-blue-400 transition-colors">Github</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">X</a>
                        </div>
                    </BentoCard>

                    {/* 4. 项目 A (1x2) */}
                    <BentoCard className="md:col-span-1 md:row-span-2 group overflow-hidden !p-0" title=" " sub="">
                        <div className="absolute inset-0 bg-gray-900 group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-xl font-bold mb-1">E-Commerce</h3>
                            <p className="text-sm opacity-80">Next.js Dashboard</p>
                        </div>
                    </BentoCard>

                    {/* 5. 统计数据 (1x1) */}
                    <BentoCard className="md:col-span-1 md:row-span-1 flex-row items-center justify-between" sub="Experience">
                        <div className="text-5xl font-bold tracking-tighter">3+</div>
                        <div className="text-right text-sm text-gray-500 font-medium">Years<br/>Working</div>
                    </BentoCard>

                    {/* 6. 特色项目 (2x1) */}
                    <BentoCard className="md:col-span-2 md:row-span-1 bg-[#ff5a5f] text-white flex-row items-center !p-0 overflow-hidden group">
                        <div className="w-1/2 h-full p-8 flex flex-col justify-center relative z-10">
                            <div className="uppercase tracking-wider text-xs font-bold opacity-70 mb-2">Featured</div>
                            <h3 className="text-2xl font-bold">Smart Home App</h3>
                        </div>
                        <div className="w-1/2 h-full bg-white/10 group-hover:bg-white/20 transition-colors relative">
                            {/* 装饰圆 */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                        </div>
                    </BentoCard>

                    {/* 7. 工具栈 (1x1) */}
                   <BentoCard className="md:col-span-1 md:row-span-1 justify-center items-center">
                        <div className="grid grid-cols-3 gap-3 opacity-60">
                           {/* 模拟图标 */}
                           {[...Array(9)].map((_, i) => (
                               <div key={i} className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"></div>
                           ))}
                        </div>
                   </BentoCard>

                </div>
                
                <footer className="mt-16 text-center text-sm text-gray-400 pb-20">
                    &copy; 2026 Xueyanlei. Designed in California.
                </footer>
            </div>
        </div>
    );
};

export default Bento;
