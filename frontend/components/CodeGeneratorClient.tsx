"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck, FiSun, FiMoon, FiStar, FiTrash2, FiSearch, FiLoader } from "react-icons/fi";
import { useTheme } from "@/contexts/ThemeContext";
import { usePromptHistory } from "@/contexts/PromptHistoryContext";
import type { Language } from "@/types";

export default function CodeGeneratorClient() {
  const { theme, toggleTheme } = useTheme();
  const { prompts, addPrompt, toggleFavorite, deletePrompt } = usePromptHistory();
  
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState<Language>("python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showHistory, setShowHistory] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const languages: Language[] = ["python", "javascript", "typescript", "cpp", "java", "go", "rust"];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setLoadingProgress(0);
    
    // Simulate progress for better UX (since AI generation is variable)
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev; // Cap at 90% until real response
        return prev + Math.random() * 15;
      });
    }, 300);
    
    const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(id);
        return response;
      } catch (error) {
        clearTimeout(id);
        throw error;
      }
    };

    try {
      console.log(" Generating code for:", { prompt: prompt.substring(0, 50), language });
      
      // Use Next.js API route (same domain, no CORS issues)
      const response = await fetchWithTimeout(`/api/generate`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ prompt, language }),
      }, 15000); // 15 second timeout (optimized backend)

      console.log("✅ Response status:", response.status);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Non-JSON response:", text.substring(0, 200));
        throw new Error("Backend returned HTML instead of JSON. The server might be starting up (Render free tier can take 30-60 seconds to wake up). Please try again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error || `HTTP error! status: ${response.status}`;
        const errorType = errorData.type;
        
        // Handle non-code prompt validation error
        if (errorType === "non_code_prompt") {
          clearInterval(progressInterval);
          setLoading(false);
          setLoadingProgress(0);
          setGeneratedCode(
            `// ⚠️ Invalid Prompt\n\n` +
            `// This tool is for CODE GENERATION ONLY.\n` +
            `// Your prompt: "${prompt}"\n\n` +
            `// ✅ Please provide a coding-related request, such as:\n` +
            `//   • "Write a function to reverse a string"\n` +
            `//   • "Create a sorting algorithm in ${language}"\n` +
            `//   • "Implement a binary search tree"\n` +
            `//   • "Build a REST API endpoint"\n` +
            `//   • "Solve the two-sum problem"\n` +
            `//   • "Create a calculator class"\n\n` +
            `// Try again with a code-related request!`
          );
          return; // Don't throw error, just show message
        }
        
        // Provide helpful error messages for other errors
        if (errorMsg.includes("API authentication failed") || errorMsg.includes("API key")) {
          throw new Error("Gemini API Key is missing or invalid on the backend.\n\nPlease add GEMINI_API_KEY environment variable in Render:\n1. Go to Render Dashboard\n2. Select your service\n3. Go to Environment tab\n4. Add GEMINI_API_KEY variable\n5. Save and redeploy");
        }
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("✅ API Response received:", data.success ? "Success" : "Error");
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      const code = data.data?.code || data.code || "// No code generated";
      setGeneratedCode(code);
      
      // Save to history
      addPrompt({ prompt, language, code, isFavorite: false });
    } catch (error) {
      clearInterval(progressInterval);
      console.error("❌ Error generating code:", error);
      
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Request timeout (30s). Backend might be waking up on Render free tier. Please try again in a minute.";
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = "Cannot connect to backend. Possible causes:\n// 1. Backend is waking up (Render free tier sleeps after inactivity)\n// 2. CORS is blocking the request\n// 3. Backend URL is incorrect\n// \n// Please wait 30-60 seconds and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setGeneratedCode(`// ⚠️ Error: ${errorMessage}\n\n// Check console for more details.`);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
      setLoadingProgress(0);
    }
  };

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`/api/health`, {
        method: "GET",
      });
      const data = await response.json();
      alert(`✅ API is ${data.status}!\nMode: ${data.mode}\nTimestamp: ${data.timestamp}`);
    } catch (error) {
      alert("❌ Backend is not responding. It might be waking up (takes 30-60s on Render free tier). Please wait and try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPromptFromHistory = (historyPrompt: string, historyLanguage: string, historyCode: string) => {
    setPrompt(historyPrompt);
    setLanguage(historyLanguage as Language);
    setGeneratedCode(historyCode);
  };

  // Filter prompts
  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch = p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filterLanguage === "all" || p.language === filterLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Glass Morphism */}
      <header className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <div className="max-w-full px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse group-hover:animate-none"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover-scale hover-glow">
                <span className="text-white font-bold text-xl transition-transform group-hover:scale-110">{"<>"}</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Code Generation Copilot
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">✨ Transform ideas into code with AI magic</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="group relative px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover-lift hover-glow overflow-hidden btn-ripple"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>{showHistory ? "Hide" : "Show"} History</span>
              </span>
            </button>
            <button
              onClick={checkBackendHealth}
              className="px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover-lift hover-glow"
              title="Check if backend API is responding"
            >
              🏥 Health Check
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:shadow-2xl transition-all duration-300 hover-scale hover-glow hover-rotate"
              aria-label="Toggle theme"
            >
              {theme === "light" ? 
                <FiMoon className="w-5 h-5 text-purple-600" /> : 
                <FiSun className="w-5 h-5 text-yellow-400" />
              }
            </button>
          </div>
        </div>
      </header>

      <div className="relative flex h-[calc(100vh-89px)]">
        {/* History Sidebar with Glass Effect */}
        {showHistory && (
          <aside className="w-80 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-r border-gray-200/50 dark:border-gray-700/50 overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/50 to-purple-50/30 dark:from-gray-800/50 dark:to-purple-900/20">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📜 Prompt History
              </h2>
              
              {/* Search with Enhanced Style */}
              <div className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 dark:bg-gray-800/80 border-2 border-purple-200 dark:border-purple-800 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white placeholder-gray-400 transition-all shadow-sm"
                />
              </div>

              {/* Language Filter with Enhanced Style */}
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/80 dark:bg-gray-800/80 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white font-medium transition-all shadow-sm"
              >
                <option value="all">🌐 All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 space-y-3">
              {filteredPrompts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-3">📝</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {searchQuery || filterLanguage !== "all" ? "No matching prompts" : "No history yet"}
                  </p>
                </div>
              ) : (
                filteredPrompts.map((p) => (
                  <div
                    key={p.id}
                    className="relative group p-4 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-600 card-hover overflow-hidden"
                    onClick={() => loadPromptFromHistory(p.prompt, p.language, p.code)}
                  >
                    {/* Hover shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Language Badge */}
                    <div className="relative flex items-start justify-between mb-3">
                      <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full uppercase shadow-sm hover-scale transition-all">
                        {p.language}
                      </span>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(p.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all hover-scale hover:shadow-lg"
                          title={p.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <FiStar
                            className={`w-4 h-4 transition-all hover-pulse ${
                              p.isFavorite ? "fill-yellow-400 text-yellow-400 scale-125 animate-pulse" : "text-gray-400 hover:text-yellow-400 hover:rotate-12"
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePrompt(p.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all hover-scale hover:shadow-lg"
                          title="Delete prompt"
                        >
                          <FiTrash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-all hover:rotate-12" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 dark:text-gray-100 line-clamp-2 font-medium mb-2">{p.prompt}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <span className="mr-1">🕐</span>
                      {new Date(p.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}

        {/* Main Content: Prompt LEFT, Code Output RIGHT */}
        <main className="flex-1 overflow-hidden relative">
          <div className="h-full flex">
            {/* LEFT PANEL - Prompt Input with Stunning Design */}
            <div className="w-1/2 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col backdrop-blur-xl bg-white/50 dark:bg-gray-900/50">
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Language Selector with Gradient */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        🎯 Select Language
                      </span>
                    </label>
                    <div className="relative group">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="w-full px-5 py-3.5 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-2 border-purple-200 dark:border-purple-800 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700 focus:border-transparent text-gray-900 dark:text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-600 hover-lift cursor-pointer appearance-none [&>option]:text-gray-900 [&>option]:dark:text-white [&>option]:bg-white [&>option]:dark:bg-gray-800"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang} className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
                            {lang === "python" && "🐍"} 
                            {lang === "javascript" && "⚡"} 
                            {lang === "typescript" && "💙"} 
                            {lang === "cpp" && "⚙️"} 
                            {lang === "java" && "☕"} 
                            {lang === "go" && "🚀"} 
                            {lang === "rust" && "🦀"} 
                            {" " + lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Prompt Input with Beautiful Design */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ✨ Describe what you want to build
                      </span>
                    </label>
                    <div className="relative group">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Create a React component for a todo list with add, delete, and mark complete features..."
                        className="w-full h-80 px-6 py-4 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 focus:border-transparent resize-none dark:text-white placeholder-gray-400 text-base leading-relaxed shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            handleGenerate();
                          }
                        }}
                      />
                      {/* Floating hint */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-blue-500/90 text-white text-xs rounded-lg backdrop-blur-sm shadow-lg font-medium">
                        ⌨️ Ctrl+Enter to generate
                      </div>
                    </div>
                  </div>

                  {/* Generate Button with Stunning Design */}
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="group relative w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover-glow btn-ripple"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover-gradient animate-gradient-x"></div>
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-pulse"></div>
                    </div>
                    <div className="relative px-8 py-4 flex items-center justify-center space-x-3 backdrop-blur-sm">
                      {loading ? (
                        <>
                          <FiLoader className="w-6 h-6 text-white animate-spin" />
                          <span className="text-white font-bold text-lg shimmer">Generating magic...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white font-bold text-lg group-hover:tracking-wider transition-all">✨ Generate Code</span>
                          <svg className="w-6 h-6 text-white transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Code Output with Stunning Design */}
            <div className="w-1/2 flex flex-col backdrop-blur-xl bg-gray-50/50 dark:bg-gray-900/50">
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 shadow-lg">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    💻 Generated Code
                  </h3>
                  {generatedCode && (
                    <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full uppercase shadow-sm">
                      {language}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gray-100/80 dark:bg-gray-700/80 px-4 py-2 rounded-xl">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-300">📏 Font:</label>
                    <input
                      type="range"
                      min="10"
                      max="20"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-24 accent-purple-600"
                    />
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 w-10">{fontSize}px</span>
                  </div>
                  {generatedCode && (
                    <button
                      onClick={handleCopy}
                      className="group relative overflow-hidden flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover-lift hover-glow btn-ripple"
                      title="Copy code to clipboard"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-5 h-5 text-white" />
                          <span className="font-bold text-white">Copy Code</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {!generatedCode && !loading && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4 animate-pulse">
                      <div className="text-8xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {"</>"}
                      </div>
                      <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">Ready to generate magic! ✨</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enter your prompt on the left and click <span className="font-bold text-purple-600">Generate Code</span></p>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping opacity-75">
                          <FiLoader className="w-16 h-16 text-purple-600 mx-auto" />
                        </div>
                        <FiLoader className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
                      </div>
                      <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Creating your code...
                      </p>
                      <div className="flex space-x-2 justify-center">
                        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
                        <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce animation-delay-200"></span>
                        <span className="w-3 h-3 bg-pink-600 rounded-full animate-bounce animation-delay-400"></span>
                      </div>
                    </div>
                  </div>
                )}

                {generatedCode && !loading && (
                  <SyntaxHighlighter
                    language={language}
                    style={theme === "dark" ? vscDarkPlus : vs}
                    customStyle={{
                      margin: 0,
                      borderRadius: "8px",
                      fontSize: `${fontSize}px`,
                      lineHeight: 1.5,
                    }}
                    showLineNumbers
                  >
                    {generatedCode}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
