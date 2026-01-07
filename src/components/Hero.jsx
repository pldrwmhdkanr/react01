const Hero = () => {
    return (
        <section id="home" className="relative px-4 pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                {/* 标签徽章 */}
                <div className="animate-fadeInUp">
                    <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full glass text-purple-300 border border-purple-500/30">
                        ✨ Developer & Creator
                    </span>
                </div>
                
                {/* 主标题 */}
                <h1 className="mb-8 text-5xl font-extrabold tracking-tight md:text-7xl animate-fadeInUp animate-delay-200">
                    你好，我是{" "}
                    <span className="gradient-text animate-gradient">
                        Xueyanlei
                    </span>
                </h1>
                
                {/* 副标题 */}
                <p className="max-w-2xl mx-auto mb-12 text-xl leading-relaxed text-slate-400 animate-fadeInUp animate-delay-400">
                    我是一名热爱构建 <span className="text-purple-400">Web 应用</span>的开发者。
                    我喜欢<span className="text-cyan-400">简洁的代码</span>和<span className="text-cyan-400">优雅的设计</span>。
                </p>
                
                {/* 按钮组 */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp animate-delay-600">
                    <a
                        href="#projects"
                        className="btn-primary px-8 py-4 font-medium text-white rounded-xl shadow-lg relative z-10"
                    >
                        <span className="relative z-10">🚀 查看我的作品</span>
                    </a>
                    <a
                        href="#contact"
                        className="btn-secondary px-8 py-4 font-medium text-purple-300 rounded-xl"
                    >
                        📬 联系方式
                    </a>
                </div>
                
                {/* 向下滚动提示 */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fadeInUp animate-delay-800">
                    <div className="flex flex-col items-center text-slate-500">
                        <span className="text-xs mb-2">向下滚动</span>
                        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-purple-500 rounded-full mt-2 animate-float"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 装饰性圆环 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full animate-spin-slow pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/5 rounded-full animate-spin-slow pointer-events-none" style={{animationDirection: 'reverse', animationDuration: '30s'}}></div>
        </section>
    )
}

export default Hero