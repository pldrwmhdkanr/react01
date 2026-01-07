import React from 'react';

const Editorial = () => {
    return (
        <div className="min-h-screen bg-white text-black font-serif selection:bg-black selection:text-white p-6 md:p-12">
            {/* 顶栏 */}
            <header className="flex justify-between items-start mb-24 md:mb-32">
                <div className="text-sm font-sans tracking-widest uppercase">
                    Portfolio &copy; 2026
                </div>
                <nav className="hidden md:flex flex-col text-right font-sans text-xs tracking-widest gap-2">
                    <a href="#work" className="hover:underline opacity-60 hover:opacity-100">WORK</a>
                    <a href="#about" className="hover:underline opacity-60 hover:opacity-100">ABOUT</a>
                    <a href="#contact" className="hover:underline opacity-60 hover:opacity-100">CONTACT</a>
                </nav>
            </header>

            {/* Hero 区域：不对称布局 */}
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32 items-end">
                    <div className="md:col-span-8">
                        <h1 className="text-[12vw] leading-[0.85] font-normal tracking-tight mb-8">
                            DIGITAL <br/>
                            <span className="italic">CRAFTSMAN</span>
                        </h1>
                    </div>
                    <div className="md:col-span-4 font-sans text-sm md:text-base leading-relaxed md:pb-4 opacity-80">
                        <p className="mb-6">
                            I build digital experiences that blend aesthetic purity with technical precision. 
                            Based in Digital Space.
                        </p>
                        <p className="font-bold border-b border-black inline-block pb-1">SCROLL TO EXPLORE</p>
                    </div>
                </div>

                {/* 大图展示 */}
                <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-100 mb-32 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-neutral-200 group-hover:bg-neutral-300 transition-colors duration-700"></div>
                    {/* 装饰线 */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-black/10"></div>
                    <div className="absolute top-0 left-1/2 h-full w-px bg-black/10"></div>
                    <div className="absolute bottom-8 left-8 font-sans text-xs">
                        FEATURED PROJECT (01)
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 font-serif italic">
                        Visual
                    </div>
                </div>

                {/* 项目列表 */}
                <section className="mb-32">
                    <div className="border-t border-black pt-4 mb-16 flex justify-between font-sans text-xs uppercase tracking-widest">
                        <span>Selected Works</span>
                        <span>(03)</span>
                    </div>

                    <div className="space-y-0">
                        {[
                            { id: '01', title: 'Data Dashboard', cat: 'Vue / Visualization' },
                            { id: '02', title: 'Personal Blog', cat: 'React / Minimalist' },
                            { id: '03', title: 'CLI Tools', cat: 'Node.js / Automation' }
                        ].map((item) => (
                            <div key={item.id} className="group border-b border-gray-200 hover:border-black transition-colors py-12 flex flex-col md:flex-row justify-between md:items-center cursor-pointer">
                                <span className="font-sans text-xs text-gray-400 mb-4 md:mb-0">/{item.id}</span>
                                <h2 className="text-4xl md:text-6xl font-normal group-hover:italic transition-all duration-300">{item.title}</h2>
                                <span className="font-sans text-xs mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">{item.cat}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 页脚 */}
                <footer className="border-t-2 border-black pt-32 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div className="mb-12 md:mb-0">
                        <h3 className="text-6xl md:text-8xl mb-8">Let's Talk.</h3>
                        <a href="mailto:hello@example.com" className="font-sans text-lg underline decoration-1 hover:decoration-2">hello@xueyanlei.dev</a>
                    </div>
                    <div className="font-sans text-xs grid grid-cols-2 gap-x-12 gap-y-2 opacity-60">
                        <a href="#" className="hover:text-black hover:opacity-100">GITHUB</a>
                        <a href="#" className="hover:text-black hover:opacity-100">X / TWITTER</a>
                        <a href="#" className="hover:text-black hover:opacity-100">LINKEDIN</a>
                        <a href="#" className="hover:text-black hover:opacity-100">INSTAGRAM</a>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Editorial;
