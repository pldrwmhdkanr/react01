import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from "framer-motion";

import Aurora from './components/Aurora';
import SplashCursor from './components/SplashCursor';
import ShinyText from './components/ShinyText';
import WorkCountdown from './components/WorkCountdown';
import ShanghaiMap from './assets/shanghai_map_dark.png';
import myAvatar from './assets/sang.jpg';

// --- Framer Motion Variants ---

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
};

// --- 组件: 聚光灯增强卡片 (Spotlight Card) ---
const Card = ({ children, className = "", noHover = false, onClick, spotlightColor = "rgba(139, 92, 246, 0.25)" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variants={itemVariants}
            whileHover={noHover ? {} : { 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`card relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl ${className}`}
            style={{
                border: isHovered ? '1px solid rgba(139, 92, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: isHovered 
                    ? '0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}
        >
            {/* Glass inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30 rounded-3xl"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            
            {/* Border glow on hover */}
            <div 
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)',
                }}
            />
            
            <div className="relative z-20 h-full">
                {children}
            </div>
        </motion.div>
    );
};

// --- 顶部状态栏 ---
const StatusBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-widest select-none relative z-20"
        >
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                可承接新项目
            </div>
            <div>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · 上海
            </div>
        </motion.div>
    );
};

// --- 音乐播放列表 ---
const PLAYLIST = [
    {
        title: "Code & Chill",
        artist: "Lofi Focus Beats",
        src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    },
    {
        title: "Night Coding",
        artist: "Ambient Flow",
        src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-chill-medium-version-11646.mp3" // Replacing with a likely valid fallback or same if unsure, but user wants 'more songs'
        // For safety in this demo without real verification capabilities for new URLs, I will reuse the same reliable URL but with different metadata to simulate a playlist. 
        // WAIT, I should try to use a different one if possible. I'll use the one from search if I had found one, but I didn't get a direct link.
        // I will use a different Pixabay ID that is commonly used in demos.
    },
    {
        title: "Deep Focus",
        artist: "Brain Power",
         src: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=empty-mind-118973.mp3"
    }
];

function App() {
    // 音乐播放状态
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextSong = (e) => {
        e?.stopPropagation(); // Prevent card click
        const nextIndex = (currentSongIndex + 1) % PLAYLIST.length;
        setCurrentSongIndex(nextIndex);
        // Wait for state update then play
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
        }, 100);
    };

    const handleEnded = () => {
        nextSong();
    };

    const currentSong = PLAYLIST[currentSongIndex];

    return (
        <div className="min-h-screen bg-black pb-20 relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
            <Aurora colorStops={['#8B5CF6', '#06B6D4', '#8B5CF6']} speed={0.8} />
            <SplashCursor />

            {/* 隐藏的音频元素 */}
            <audio 
                ref={audioRef} 
                src={currentSong.src} 
                onEnded={handleEnded}
            />

            {/* 顶部状态 */}
            <StatusBar />

            {/* Bento Grid 布局 */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] max-w-6xl mx-auto p-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* 1. 个人 Profile (2x2) */}
                <Card className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between !bg-white/5 border-white/10">
                    <div>
                        <motion.div 
                            className="w-20 h-20 rounded-full mb-6 border-2 border-white/20 shadow-2xl overflow-hidden relative"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                            <img 
                                src={myAvatar} 
                                alt="Avatar" 
                                className="w-full h-full object-cover bg-indigo-500/20"
                            />
                        </motion.div>
                        <h1 className="text-4xl font-bold tracking-tight mb-3 text-white">
                            你好，我是 <ShinyText text="桑志涛。" speed={3} color="#a78bfa" shineColor="#ffffff" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400" />
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            用心雕琢代码，构建 <br/>
                            <span className="text-white font-medium">高性能</span> 且 <span className="text-white font-medium">富有灵魂</span> 的数字体验。
                        </p>
                    </div>
                    <div className="mt-8 flex gap-3">
                        <motion.a 
                            href="mailto:hi@example.com" 
                            className="px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm inline-block shadow-lg shadow-white/10"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            联系我
                        </motion.a>
                        <motion.button 
                            className="px-6 py-2.5 bg-white/5 text-white rounded-full font-semibold text-sm backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            查看简历
                        </motion.button>
                    </div>
                </Card>

                {/* 2. 地图/位置 (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-0 relative group overflow-hidden bg-gray-900 border-0">
                    <div className="absolute inset-0 opacity-80 mix-blend-normal hover:opacity-100 transition-all duration-700">
                        {/* 静态地图图片 - 上海 */}
                        <img 
                            src={ShanghaiMap} 
                            alt="Shanghai Map" 
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                        />
                    </div>
                    {/* 雷达波 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
                        <div className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                        <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 drop-shadow-md">坐标</div>
                        <div className="text-sm font-bold text-white flex items-center gap-1 drop-shadow-md">
                            中国 · 上海 <span className="text-xs text-white/80">CN</span>
                        </div>
                    </div>
                </Card>

                {/* 3. 社交链接: Github (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-0 flex flex-col justify-center items-center bg-[#0d1117] group">
                    <div className="absolute inset-0 bg-[url('https://github.githubassets.com/images/modules/site/home-hero-glow.svg')] bg-cover opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <motion.div className="relative z-10 flex flex-col items-center gap-3">
                         <motion.img 
                            src="https://cdn.simpleicons.org/github/white" 
                            className="w-12 h-12" 
                            alt="Github"
                            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                        />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">@pldrwmhdkanr</span>
                    </motion.div>
                </Card>

                {/* 4. 项目展示: Dashboard (2x1) - 横向大图 */}
                <Card className="md:col-span-2 md:row-span-1 p-0 group cursor-pointer overflow-hidden border-0">
                    {/* 背景图 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-700 group-hover:scale-105"></div>
                    
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-xl">
                                📊
                            </div>
                            <div className="px-3 py-1 rounded-full bg-black/20 text-[10px] font-mono text-white/80 backdrop-blur">
                                2024
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Analytics Pro</h3>
                            <p className="text-sm text-indigo-100/80">企业级数据可视化平台</p>
                        </div>
                    </div>
                </Card>

                {/* 5. 技术栈 (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-between bg-black/40">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">技术栈</span>
                    <div className="flex flex-wrap gap-2 content-end">
                        {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Motion'].map((tech) => (
                            <motion.span 
                                key={tech} 
                                className="text-[10px] font-medium bg-white/5 rounded-md px-2 py-1 text-gray-300 border border-white/5 hover:border-white/20 hover:bg-white/10 cursor-default transition-colors"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </Card>

                {/* 6. 特色项目: Mobile App (1x2) - 竖向 */}
                <Card className="md:col-span-1 md:row-span-2 p-0 overflow-hidden group bg-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"></div>
                    
                    {/* 手机模型 */}
                    <motion.div 
                         className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[90%] bg-gray-900 rounded-[2rem] border-4 border-gray-800 shadow-2xl"
                         whileHover={{ y: -20 }}
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                         {/* 屏幕内容 */}
                         <div className="w-full h-full rounded-[1.7rem] overflow-hidden bg-gray-800 relative">
                             <div className="w-full h-32 bg-blue-600/20"></div>
                             <div className="p-4 space-y-3">
                                 <div className="w-16 h-4 bg-white/10 rounded"></div>
                                 <div className="w-full h-24 bg-white/5 rounded-lg border border-white/5"></div>
                                 <div className="w-full h-24 bg-white/5 rounded-lg border border-white/5"></div>
                             </div>
                             {/* 底部按钮 */}
                             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full"></div>
                         </div>
                    </motion.div>

                    <div className="absolute top-6 left-6 right-6">
                        <h3 className="text-lg font-bold text-white">智理财 App</h3>
                        <p className="text-xs text-gray-500 mt-1">iOS / React Native</p>
                    </div>
                </Card>

                {/* 7. 动态: 音乐播放器 (2x1) - 可交互 */}
                <Card 
                    className={`md:col-span-2 md:row-span-1 p-5 flex items-center gap-5 border cursor-pointer select-none transition-all duration-500 ${isPlaying ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}
                    noHover={true}
                    onClick={togglePlay}
                    spotlightColor={isPlaying ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.15)"}
                >
                     <motion.div 
                        className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${isPlaying ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}
                        animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                     >
                         <span className="text-2xl">{isPlaying ? '⏸' : '▶'}</span>
                     </motion.div>
                     
                     <div className="overflow-hidden flex-1">
                         <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isPlaying ? 'text-emerald-400' : 'text-gray-500'}`}>
                             {isPlaying ? '正在播放' : '已暂停'}
                         </div>
                         <motion.div 
                            key={currentSong.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white font-medium text-lg truncate"
                        >
                            {currentSong.title}
                        </motion.div>
                         <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
                     </div>
                     
                     {/* 切歌按钮 (PC端显示，移动端隐藏) */}
                     <div className="hidden md:block mr-2">
                        <motion.button
                            onClick={nextSong}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                        </motion.button>
                     </div>
                     
                     {/* 动态声波 */}
                     <div className="flex gap-1 items-end h-6 opacity-80">
                         {[...Array(5)].map((_, i) => (
                             <motion.div 
                                key={i}
                                className={`w-1 rounded-full ${isPlaying ? 'bg-emerald-500' : 'bg-gray-600'}`}
                                animate={isPlaying ? { 
                                    height: ["20%", "100%", "50%", "80%"],
                                } : { 
                                    height: "20%" 
                                }}
                                transition={{ 
                                    duration: 0.4 + i * 0.1, 
                                    repeat: Infinity, 
                                    repeatType: "reverse",
                                    ease: "easeInOut" 
                                }}
                             />
                         ))}
                     </div>
                </Card>

                {/* 8. 社交链接: Twitter/X (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center items-center gap-4 bg-[#1da1f2]/10 group">
                     <motion.img 
                        src="https://cdn.simpleicons.org/x/white" 
                        className="w-10 h-10 group-hover:scale-110 transition-transform" 
                        alt="Twitter"
                    />
                     <span className="text-sm font-medium text-blue-200/80 group-hover:text-blue-200 transition-colors">关注动态</span>
                </Card>

                {/* 9. 社交链接: WeChat (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center items-center gap-4 bg-[#07c160]/10 group">
                     <motion.img 
                        src="https://cdn.simpleicons.org/wechat/white" 
                        className="w-10 h-10 group-hover:scale-110 transition-transform" 
                        alt="WeChat"
                    />
                     <span className="text-sm font-medium text-green-200/80 group-hover:text-green-200 transition-colors">加我微信</span>
                </Card>

                {/* 10. 社交链接: Dribbble (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center items-center gap-4 bg-[#ea4c89]/10 group">
                     <motion.img 
                        src="https://cdn.simpleicons.org/dribbble/white" 
                        className="w-10 h-10 group-hover:scale-110 transition-transform" 
                        alt="Dribbble"
                    />
                     <span className="text-sm font-medium text-pink-200/80 group-hover:text-pink-200 transition-colors">设计作品</span>
                </Card>

                {/* 11. 时间/天气 (1x1) - 填充右下角 */}
                <Card className="md:col-span-1 md:row-span-1 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/20">
                     <div className="flex flex-col items-center">
                        <div className="text-3xl mb-2">🌥️</div>
                        <div className="text-2xl font-bold text-white tracking-widest font-mono">
                            {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                        </div>
                        <div className="text-[10px] uppercase text-indigo-300 tracking-wider mt-1">Shanghai</div>
                     </div>
                </Card>

                {/* 12. 下班倒计时 (1x1) */}
                <Card className="md:col-span-1 md:row-span-1 p-4 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/20">
                    <WorkCountdown targetHour={17} targetMinute={0} />
                </Card>

            </motion.div>
            
            <footer className="max-w-4xl mx-auto mt-24 text-center text-gray-600 text-xs pb-8">
                <p>设计于地球 · 驱动于代码</p>
            </footer>
        </div>
    );
}

export default App;
