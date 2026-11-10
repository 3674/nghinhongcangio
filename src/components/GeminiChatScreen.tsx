import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface Citation {
  ma_tu_lieu: string;
  ten_tu_lieu: string;
  cong_dong: string;
  dia_danh: string;
  ten_nguon: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: Citation[];
  isError?: boolean;
}

interface GeminiChatScreenProps {
  onNavigateToRecord: (recordId: string) => void;
  initialPrompt?: string;
}

export const GeminiChatScreen: React.FC<GeminiChatScreenProps> = ({
  onNavigateToRecord,
  initialPrompt = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Xin kính chào quý bạn đọc và các nhà nghiên cứu!

Tôi là **Trợ lý khám phá văn hóa Nghinh Ông**, được thiết kế để hỗ trợ tra cứu và giải thích các tư liệu di sản Lễ hội Nghinh Ông Cần Giờ (Đề tài G02 - Sinh viên Trần Quang Đức, FPT Polytechnic x IMTA TECH).

**Cam kết liêm chính học thuật & bảo vệ di sản:**
* Tôi chỉ trả lời dựa trên hồ sơ số hóa đã xác thực (tệp \`disan.json\`) và các nguồn quản lý di sản chính thống.
* Tuyệt đối không suy đoán, không bịa đặt hoặc lấy thông tin từ vùng biển khác gán cho Cần Giờ.
* Mọi câu trả lời đều kèm trích dẫn mã tư liệu cụ thể để bạn tra cứu nguồn gốc.

Bạn muốn tìm hiểu về nghi thức, địa danh hay tri thức bản địa nào của bà con ngư dân Cần Giờ?`,
      timestamp: 'Ngay bây giờ',
      citations: [
        {
          ma_tu_lieu: 'NG-001',
          ten_tu_lieu: 'Lễ hội Nghinh Ông Cần Giờ',
          cong_dong: 'Cộng đồng ngư dân Cần Giờ',
          dia_danh: 'Thị trấn Cần Thạnh, Cần Giờ',
          ten_nguon: 'Cục Di sản văn hóa - Quyết định 3822/QĐ-BVHTTDL'
        }
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Lễ hội Nghinh Ông Cần Giờ có nguồn gốc và ý nghĩa như thế nào đối với ngư dân?',
    'Tín ngưỡng thờ Cá Ông tại Cần Giờ được biểu hiện như thế nào?',
    'Nghi thức Nghinh Ông trên biển diễn ra theo trình tự nào?',
    'Hát Bả Trạo trong lễ hội mang ý nghĩa và điệu bộ gì?',
    'Lăng Ông Thủy Tướng Cần Thạnh lưu giữ di vật lịch sử gì?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });

      if (!res.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.answer || 'Hiện tại kho tư liệu chưa có thông tin xác thực về nội dung này.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || []
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Hiện tại hệ thống xử lý đang bận hoặc kho tư liệu chưa có thông tin xác thực về nội dung này. Vui lòng thử lại với câu hỏi cụ thể hơn về các bản ghi NG-001 đến NG-015.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'reset',
        sender: 'assistant',
        text: 'Lịch sử trò chuyện đã được làm mới. Tôi sẵn sàng hỗ trợ bạn tra cứu các hồ sơ di sản tiếp theo!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 text-white shadow-lg border border-sky-800/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trợ lý chuyên môn số hóa di sản</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">
              Trợ Lý Khám Phá Văn Hóa Nghinh Ông
            </h1>
            <p className="text-xs sm:text-sm text-sky-200">
              Hệ thống trả lời thông minh dựa trên dữ liệu chuẩn hóa của 15 bản ghi di sản Cần Giờ.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="self-start sm:self-auto px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới hội thoại</span>
          </button>
        </div>

        {/* Ethical Grounding Rule Badge */}
        <div className="mt-4 pt-4 border-t border-sky-800/60 flex items-center gap-2 text-xs text-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
          <span>Nguyên tắc kiểm chứng: Chỉ trả lời dữ liệu có thật trong \`disan.json\`, không bịa đặt, bảo vệ quyền người cung cấp.</span>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Câu hỏi gợi ý tra cứu nhanh:
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs text-left bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-800 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-700 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 text-teal-200" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-700 text-white shadow-xs rounded-tr-xs'
                    : msg.isError
                    ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-tl-xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                }`}
              >
                {/* Message Body with markdown-like linebreaks */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.text}
                </div>

                {/* Citations Box (Mandatory per Gemini Constraints) */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                      <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                      <span>Hồ sơ di sản & Nguồn đối chiếu được sử dụng:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.citations.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => onNavigateToRecord(c.ma_tu_lieu.toLowerCase())}
                          className="p-2.5 rounded-xl bg-white border border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-colors cursor-pointer flex items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <span className="font-mono font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded text-[10px] mr-1.5">
                              {c.ma_tu_lieu}
                            </span>
                            <strong className="text-slate-900">{c.ten_tu_lieu}</strong>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {c.dia_danh} • Nguồn: {c.ten_nguon}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[10px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                }`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs pl-2">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center animate-spin">
                <Sparkles className="w-4 h-4 text-sky-600" />
              </div>
              <span>Trợ lý đang tra cứu và đối chiếu với hồ sơ số hóa disan.json...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Đặt câu hỏi về Lễ hội Nghinh Ông, các nghi thức hoặc văn hóa ngư dân..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-5 py-3 bg-gradient-to-r from-sky-700 to-teal-700 hover:from-sky-800 hover:to-teal-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer text-sm shrink-0"
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[11px] text-slate-500 text-center mt-2">
            Mọi thông tin phản hồi đều được đối chiếu chặt chẽ với cơ sở dữ liệu di sản văn hóa Cần Giờ.
          </div>
        </div>
      </div>
    </div>
  );
};
