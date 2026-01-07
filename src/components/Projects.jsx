const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "数据可视化看板",
            desc: "使用 Vue 和 ECharts 构建的动态报表系统，支持实时数据刷新。",
            tag: "Vue.js",
            icon: "📊",
            color: "from-green-500/20 to-emerald-500/20",
        },
        {
            id: 2,
            title: "个人博客",
            desc: "基于 React 和 Markdown 的静态博客，记录我的技术笔记。",
            tag: "React",
            icon: "📝",
            color: "from-blue-500/20 to-cyan-500/20",
        },
        {
            id: 3,
            title: "自动化脚本",
            desc: "Node.js 编写的 CLI 工具，用于自动化部署流程。",
            tag: "Node.js",
            icon: "⚡",
            color: "from-purple-500/20 to-pink-500/20",
        },
    ]

    return (
        <section id="projects" className="relative px-4 py-24">
            <div className="max-w-5xl mx-auto">
                {/* 标题 */}
                <div className="text-center mb-16 animate-fadeInUp">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full glass text-cyan-300 border border-cyan-500/30">
                        Portfolio
                    </span>
                    <h2 className="text-4xl font-bold gradient-text">
                        精选项目
                    </h2>
                </div>

                {/* 项目卡片网格 */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`card-glow group animate-fadeInUp animate-delay-${(index + 2) * 100}`}
                            style={{ animationDelay: `${(index + 2) * 100}ms` }}
                        >
                            {/* 卡片图标区 */}
                            <div className={`relative h-40 flex items-center justify-center bg-gradient-to-br ${project.color} transition-all duration-300 group-hover:scale-[1.02]`}>
                                <span className="text-5xl">{project.icon}</span>
                                
                                {/* 悬浮光效 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* 卡片内容 */}
                            <div className="p-6">
                                <span className="inline-block px-2 py-1 mb-3 text-xs font-bold tracking-wide rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    {project.tag}
                                </span>
                                <h3 className="mb-3 text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-slate-400">
                                    {project.desc}
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                                >
                                    了解更多 
                                    <span className="ml-1 transition-transform group-hover/link:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects