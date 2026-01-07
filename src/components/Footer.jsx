const Footer = () => {
    return (
        <footer
            id="contact"
            className="relative py-16 text-center border-t border-white/5"
        >
            {/* 渐变分割线 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            
            <div className="max-w-3xl mx-auto px-4">
                <p className="mb-4 text-2xl font-bold gradient-text animate-fadeInUp">
                    Ready to start?
                </p>
                <p className="mb-8 text-slate-400 animate-fadeInUp animate-delay-200">
                    如果你有好的想法，欢迎随时联系我。
                </p>
                
                {/* 联系按钮 */}
                <div className="mb-12 animate-fadeInUp animate-delay-300">
                    <a 
                        href="mailto:hello@xueyanlei.dev" 
                        className="btn-primary px-8 py-3 rounded-xl text-white font-medium inline-block relative z-10"
                    >
                        <span className="relative z-10">📧 发送邮件</span>
                    </a>
                </div>
                
                {/* 社交链接 */}
                <div className="flex justify-center gap-6 mb-8 animate-fadeInUp animate-delay-400">
                    <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors text-2xl hover:scale-110 transform">
                        🐙
                    </a>
                    <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-2xl hover:scale-110 transform">
                        🐦
                    </a>
                    <a href="#" className="text-slate-500 hover:text-purple-400 transition-colors text-2xl hover:scale-110 transform">
                        💼
                    </a>
                </div>
                
                {/* 版权信息 */}
                <div className="text-sm text-slate-600 animate-fadeInUp animate-delay-500">
                    © {new Date().getFullYear()} Xueyanlei. Built with{" "}
                    <span className="text-cyan-500">React</span> &{" "}
                    <span className="text-purple-500">Tailwind</span>.
                </div>
            </div>
        </footer>
    )
}

export default Footer