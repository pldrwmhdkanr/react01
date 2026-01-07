import React, { useState } from "react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "#home", label: "首页" },
        { href: "#projects", label: "项目" },
        { href: "#contact", label: "联系" },
    ]

    return (
        <nav className="fixed z-50 w-full glass border-b border-white/5">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / 名字 */}
                    <a href="#home" className="text-xl font-bold tracking-wider gradient-text animate-gradient hover:scale-105 transition-transform">
                        Xueyanlei
                    </a>

                    {/* 桌面端菜单 */}
                    <div className="hidden space-x-8 text-sm font-medium md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="link-underline text-slate-300 hover:text-purple-400 transition-colors py-1"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* 移动端菜单按钮 */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-300 hover:text-purple-400 transition-colors focus:outline-none"
                        >
                            <div className="relative w-6 h-5">
                                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
                                <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* 移动端下拉菜单 */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
                <div className="p-4 space-y-3 glass border-t border-white/5">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-slate-300 hover:text-purple-400 transition-colors py-2"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar