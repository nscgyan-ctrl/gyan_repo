import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { haccpLevels } from './data/haccpContent';
import Certificate from './components/Certificate';

// ============ LOGIN PAGE ============
function LoginPage({ onSwitch, onAdminLogin }: { onSwitch: () => void; onAdminLogin: () => void }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill all fields'); return; }
    const success = login(email, password);
    if (!success) setError('Invalid email or password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">HACCP Training Platform</h1>
          <p className="text-gray-500 mt-1">Sign in to continue learning</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Sign In</button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-gray-600">Don't have an account? <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">Register Here</button></p>
          <button onClick={onAdminLogin} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1">
            <span>⚙️</span> Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ REGISTER PAGE ============
function RegisterPage({ onSwitch }: { onSwitch: () => void }) {
  const { register, login } = useApp();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', district: '', state: '', pincode: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.district || !form.state || !form.pincode || !form.password) {
      setError('Please fill all fields'); return;
    }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!/^\d{10}$/.test(form.mobile)) { setError('Mobile number must be 10 digits'); return; }
    if (!/^\d{6}$/.test(form.pincode)) { setError('Pin code must be 6 digits'); return; }

    const { confirmPassword, ...data } = form;
    const result = register(data);
    if (!result) { setError('Email already registered'); return; }
    
    setSuccess(true);
    setTimeout(() => { login(form.email, form.password); }, 1500);
  };

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  if (success) return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-700">Registration Successful!</h2>
        <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-1">Register to start your HACCP training</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input type="text" value={form.mobile} onChange={e => updateField('mobile', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="10-digit number" maxLength={10} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">District *</label>
              <input type="text" value={form.district} onChange={e => updateField('district', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Your district" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
              <input type="text" value={form.state} onChange={e => updateField('state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Your state" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Pin Code *</label>
              <input type="text" value={form.pincode} onChange={e => updateField('pincode', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="6-digit pin code" maxLength={6} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" value={form.password} onChange={e => updateField('password', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input type="password" value={form.confirmPassword} onChange={e => updateField('confirmPassword', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Re-enter password" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mt-4">Register</button>
        </form>
        <p className="mt-4 text-center text-gray-600">Already have an account? <button onClick={onSwitch} className="text-blue-600 font-semibold hover:underline">Sign In</button></p>
      </div>
    </div>
  );
}

// ============ ADMIN LOGIN ============
function AdminLoginPage({ onBack }: { onBack: () => void }) {
  const { adminLogin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(password)) setError('Invalid admin password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚙️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 mt-1">Enter admin credentials</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500" placeholder="Enter admin password" />
          </div>
          <button type="submit" className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition">Login as Admin</button>
        </form>
        <p className="mt-4 text-center"><button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">← Back to Login</button></p>
      </div>
    </div>
  );
}

// ============ DASHBOARD ============
function Dashboard({ onNavigate }: { onNavigate: (page: string, level?: number) => void }) {
  const { currentUser, logout, getCandidateProgress } = useApp();
  const progress = getCandidateProgress();

  const getLevelStatus = (level: number) => {
    if (!progress) return 'locked';
    const key = `level${level}` as keyof typeof progress;
    if (progress[key].completed) return 'completed';
    if (level === 1) return 'available';
    const prevKey = `level${level - 1}` as keyof typeof progress;
    if (progress[prevKey].completed) return 'available';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <h1 className="text-xl font-bold text-gray-800">HACCP Training</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
              <span className="text-lg">👤</span>
              <span className="font-medium text-sm">{currentUser?.name}</span>
            </button>
            <button onClick={logout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {currentUser?.name}!</h2>
          <p className="text-gray-600 mt-1">Continue your HACCP training journey. Complete all 4 levels to become a certified professional.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(level => {
            const status = getLevelStatus(level);
            const p = progress?.[`level${level}` as keyof typeof progress];
            return (
              <div key={level} className={`p-4 rounded-xl border-2 ${status === 'completed' ? 'border-green-300 bg-green-50' : status === 'available' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Level {level}</span>
                  {status === 'completed' && <span className="text-green-600">✅</span>}
                  {status === 'locked' && <span className="text-gray-400">🔒</span>}
                  {status === 'available' && <span className="text-blue-600">▶️</span>}
                </div>
                {p?.completed && <p className="text-xs text-gray-500">Score: {p.score}%</p>}
              </div>
            );
          })}
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {haccpLevels.map(level => {
            const status = getLevelStatus(level.id);
            const p = progress?.[`level${level.id}` as keyof typeof progress];
            return (
              <div key={level.id} className={`bg-white rounded-xl shadow-sm border p-6 ${status === 'locked' ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{level.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{level.lessons.length} lessons • {level.questions.length} questions</p>
                  </div>
                  {status === 'completed' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed ({p?.score}%)</span>
                  )}
                  {status === 'locked' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Locked</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{level.description}</p>
                <div className="flex gap-2">
                  {status !== 'locked' && (
                    <button onClick={() => onNavigate('lessons', level.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                      {status === 'completed' ? 'Review Lessons' : 'Start Learning'}
                    </button>
                  )}
                  {status === 'completed' && (
                    <button onClick={() => onNavigate('certificate', level.id)} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition">
                      📜 View Certificate
                    </button>
                  )}
                  {status === 'locked' && (
                    <p className="text-sm text-gray-400 italic">Complete Level {level.id - 1} to unlock</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ============ LESSONS PAGE ============
function LessonsPage({ level, onStartQuiz, onBack }: { level: number; onStartQuiz: () => void; onBack: () => void }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const levelData = haccpLevels.find(l => l.id === level)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
            <h1 className="text-lg font-bold text-gray-800">{levelData.title} - Lessons</h1>
          </div>
          <span className="text-sm text-gray-500">Lesson {currentLesson + 1} of {levelData.lessons.length}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Lesson Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {levelData.lessons.map((lesson, idx) => (
            <button key={lesson.id} onClick={() => setCurrentLesson(idx)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${idx === currentLesson ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}>
              {idx + 1}. {lesson.title}
            </button>
          ))}
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{levelData.lessons[currentLesson].title}</h2>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {levelData.lessons[currentLesson].content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i} className="text-lg font-bold text-[#1e3a5f] mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 mb-1">{line.substring(2)}</li>;
              }
              if (line.match(/^\d+\./)) {
                return <p key={i} className="ml-4 mb-1">{line}</p>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="mb-2">{line}</p>;
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))} disabled={currentLesson === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-300 transition">
            ← Previous
          </button>
          {currentLesson < levelData.lessons.length - 1 ? (
            <button onClick={() => setCurrentLesson(currentLesson + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Next →
            </button>
          ) : (
            <button onClick={onStartQuiz} className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
              Take Quiz →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// ============ QUIZ PAGE ============
function QuizPage({ level, onComplete, onBack }: { level: number; onComplete: (score: number) => void; onBack: () => void }) {
  const levelData = haccpLevels.find(l => l.id === level)!;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(levelData.questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);
  };

  const score = Math.round((answers.filter((a, i) => a === levelData.questions[i].correctAnswer).length / levelData.questions.length) * 100);
  const passed = score >= 80;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '😔'}</div>
          <h2 className={`text-2xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {passed ? 'Congratulations!' : 'Not Quite There'}
          </h2>
          <p className="text-gray-600 mt-2">
            Your score: <span className="font-bold text-xl">{score}%</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {answers.filter((a, i) => a === levelData.questions[i].correctAnswer).length} out of {levelData.questions.length} correct
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {passed ? 'You have passed this level! Your certificate is ready.' : 'You need 80% to pass. Please review the lessons and try again.'}
          </p>
          <div className="mt-6 space-y-3">
            {passed && (
              <button onClick={() => onComplete(score)} className="w-full py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition">
                📜 View Certificate
              </button>
            )}
            {!passed && (
              <>
                <button onClick={onBack} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Review Lessons & Retry
                </button>
                <button onClick={() => { setSubmitted(false); setShowResult(false); setAnswers(new Array(levelData.questions.length).fill(null)); setCurrentQ(0); }} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Retake Quiz
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = levelData.questions[currentQ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
            <h1 className="text-lg font-bold text-gray-800">Level {level} Quiz</h1>
          </div>
          <span className="text-sm font-medium text-blue-600">Question {currentQ + 1}/{levelData.questions.length}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${((currentQ + 1) / levelData.questions.length) * 100}%` }}></div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} className={`w-full text-left p-4 rounded-lg border-2 transition ${answers[currentQ] === idx ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                <span className="font-medium mr-3">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 hover:bg-gray-300 transition">
            ← Previous
          </button>
          {currentQ < levelData.questions.length - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={answers.includes(null)} className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              Submit Quiz
            </button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          {levelData.questions.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentQ(idx)} className={`w-8 h-8 rounded-full text-xs font-medium transition ${idx === currentQ ? 'bg-blue-600 text-white' : answers[idx] !== null ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-500'}`}>
              {idx + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

// ============ PROFILE PAGE ============
function ProfilePage({ onBack }: { onBack: () => void }) {
  const { currentUser, updateProfile, logout } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    mobile: currentUser?.mobile || '',
    email: currentUser?.email || '',
    district: currentUser?.district || '',
    state: currentUser?.state || '',
    pincode: currentUser?.pincode || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Not completed';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
            <h1 className="text-lg font-bold text-gray-800">My Profile</h1>
          </div>
          <button onClick={logout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium">Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {saved && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg mb-4">✅ Profile updated successfully!</div>}
        
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            <button onClick={() => setEditing(!editing)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
              {editing ? 'Cancel' : '✏️ Edit'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Registration Date: {formatDate(currentUser?.registrationDate || null)}</p>
          
          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="text" value={form.mobile} onChange={e => setForm(prev => ({ ...prev, mobile: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (cannot change)</label>
                <input type="email" value={form.email} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input type="text" value={form.district} onChange={e => setForm(prev => ({ ...prev, district: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" value={form.state} onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
                <input type="text" value={form.pincode} onChange={e => setForm(prev => ({ ...prev, pincode: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Save Changes</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="text-sm text-gray-500">Name:</span><p className="font-medium">{currentUser?.name}</p></div>
              <div><span className="text-sm text-gray-500">Email:</span><p className="font-medium">{currentUser?.email}</p></div>
              <div><span className="text-sm text-gray-500">Mobile:</span><p className="font-medium">{currentUser?.mobile}</p></div>
              <div><span className="text-sm text-gray-500">District:</span><p className="font-medium">{currentUser?.district}</p></div>
              <div><span className="text-sm text-gray-500">State:</span><p className="font-medium">{currentUser?.state}</p></div>
              <div><span className="text-sm text-gray-500">Pin Code:</span><p className="font-medium">{currentUser?.pincode}</p></div>
            </div>
          )}
        </div>

        {/* Training Progress */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Training Progress</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(level => {
              const p = currentUser?.progress[`level${level}` as keyof typeof currentUser.progress];
              const levelData = haccpLevels.find(l => l.id === level);
              return (
                <div key={level} className={`p-4 rounded-lg border ${p?.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Level {level}: {levelData?.title.replace(`Level ${level} - `, '')}</h3>
                      <p className="text-sm text-gray-500">
                        {p?.completed ? `Completed on ${formatDate(p.completionDate)} • Score: ${p.score}%` : 'Not yet completed'}
                      </p>
                    </div>
                    {p?.completed && <span className="text-2xl">✅</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

// ============ ADMIN DASHBOARD ============
function AdminDashboard() {
  const { getAllCandidates, deleteCandidate, logout, updateAdminSettings, getAdminSettings, changeAdminPassword } = useApp();
  const [tab, setTab] = useState<'dashboard' | 'candidates' | 'settings'>('dashboard');
  const [showCert, setShowCert] = useState<{ candidate: any; level: number } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [companyName, setCompanyName] = useState(getAdminSettings().companyName);
  const [companyLogo, setCompanyLogo] = useState(getAdminSettings().companyLogo);
  const [msg, setMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const candidates = getAllCandidates();
  const settings = getAdminSettings();

  const completedLevels = candidates.reduce((acc, c) => {
    [1, 2, 3, 4].forEach(l => { if (c.progress[`level${l}` as keyof typeof c.progress].completed) acc[l]++; });
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<number, number>);

  const totalCompletions = Object.values(completedLevels).reduce((a, b) => a + b, 0);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteCandidate(id);
    }
  };

  const handleChangePassword = () => {
    if (changeAdminPassword(oldPassword, newPassword)) {
      setMsg('Password changed successfully!');
      setOldPassword(''); setNewPassword('');
    } else {
      setMsg('Incorrect current password');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleSaveSettings = () => {
    updateAdminSettings({ companyName, companyLogo });
    setMsg('Settings saved!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCompanyLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'District', 'State', 'Pincode', 'Registration Date', 'Level 1 Status', 'Level 1 Score', 'Level 1 Date', 'Level 2 Status', 'Level 2 Score', 'Level 2 Date', 'Level 3 Status', 'Level 3 Score', 'Level 3 Date', 'Level 4 Status', 'Level 4 Score', 'Level 4 Date'];
    const rows = candidates.map(c => [
      c.name, c.email, c.mobile, c.district, c.state, c.pincode, c.registrationDate,
      c.progress.level1.completed ? 'Passed' : 'Not Completed', c.progress.level1.score, c.progress.level1.completionDate || '',
      c.progress.level2.completed ? 'Passed' : 'Not Completed', c.progress.level2.score, c.progress.level2.completionDate || '',
      c.progress.level3.completed ? 'Passed' : 'Not Completed', c.progress.level3.score, c.progress.level3.completionDate || '',
      c.progress.level4.completed ? 'Passed' : 'Not Completed', c.progress.level4.score, c.progress.level4.completionDate || '',
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'HACCP_Candidates_Data.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={downloadCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
              📥 Download CSV
            </button>
            <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">Logout</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {(['dashboard', 'candidates', 'settings'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-6 py-3 font-medium text-sm transition border-b-2 ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t === 'dashboard' ? '📊 Dashboard' : t === 'candidates' ? '👥 Candidates' : '⚙️ Settings'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {msg && <div className="max-w-7xl mx-auto px-4 mt-4"><div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">{msg}</div></div>}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {tab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-800">{candidates.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">Total Completions</p>
                <p className="text-3xl font-bold text-green-600">{totalCompletions}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">Level 1 Passed</p>
                <p className="text-3xl font-bold text-blue-600">{completedLevels[1]}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-sm text-gray-500">All Levels Complete</p>
                <p className="text-3xl font-bold text-purple-600">{candidates.filter(c => c.progress.level1.completed && c.progress.level2.completed && c.progress.level3.completed && c.progress.level4.completed).length}</p>
              </div>
            </div>

            {/* Level Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Level-wise Progress</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(level => (
                  <div key={level} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium text-gray-600">Level {level}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${candidates.length ? (completedLevels[level] / candidates.length) * 100 : 0}%`, minWidth: completedLevels[level] > 0 ? '2rem' : '0' }}>
                        <span className="text-xs text-white font-medium">{completedLevels[level]}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-16">{candidates.length ? Math.round((completedLevels[level] / candidates.length) * 100) : 0}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Registrations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Name</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Email</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Progress</th>
                  </tr></thead>
                  <tbody>
                    {candidates.slice(-5).reverse().map(c => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">{c.name}</td>
                        <td className="py-2 px-3 text-gray-600">{c.email}</td>
                        <td className="py-2 px-3 text-gray-600">{new Date(c.registrationDate).toLocaleDateString()}</td>
                        <td className="py-2 px-3">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map(l => (
                              <span key={l} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${c.progress[`level${l}` as keyof typeof c.progress].completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                {l}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {tab === 'candidates' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">All Candidates ({candidates.length})</h2>
              <input type="text" placeholder="Search by name, email, district..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg w-80 text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Mobile</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">District</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">State</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Pincode</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reg. Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Levels</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredCandidates.map(c => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{c.name}</td>
                        <td className="py-3 px-4 text-gray-600">{c.email}</td>
                        <td className="py-3 px-4 text-gray-600">{c.mobile}</td>
                        <td className="py-3 px-4 text-gray-600">{c.district}</td>
                        <td className="py-3 px-4 text-gray-600">{c.state}</td>
                        <td className="py-3 px-4 text-gray-600">{c.pincode}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(c.registrationDate).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map(l => {
                              const p = c.progress[`level${l}` as keyof typeof c.progress];
                              return (
                                <span key={l} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer ${p.completed ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-400'}`} title={p.completed ? `Level ${l}: ${p.score}% on ${p.completionDate ? new Date(p.completionDate).toLocaleDateString() : ''}` : `Level ${l}: Not completed`}>
                                  {l}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map(l => {
                              const p = c.progress[`level${l}` as keyof typeof c.progress];
                              if (!p.completed) return null;
                              return (
                                <button key={l} onClick={() => setShowCert({ candidate: c, level: l })} className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs hover:bg-amber-200" title={`Download Level ${l} Certificate`}>
                                  📜
                                </button>
                              );
                            })}
                            <button onClick={() => handleDelete(c.id, c.name)} className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs hover:bg-red-200" title="Delete candidate">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredCandidates.length === 0 && (
                <div className="p-8 text-center text-gray-500">No candidates found</div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {tab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Change Admin Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <button onClick={handleChangePassword} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Update Password</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Certificate Customization</h3>
              <p className="text-sm text-gray-500 mb-4">Customize the certificate format for companies that want to train their employees on this platform. Leave blank for default certificate.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (optional)</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Leave blank for default" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo (optional)</label>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-sm" />
                  {companyLogo && (
                    <div className="mt-2 flex items-center gap-3">
                      <img src={companyLogo} alt="Logo" className="w-16 h-16 object-contain border rounded" />
                      <button onClick={() => setCompanyLogo('')} className="text-sm text-red-600 hover:underline">Remove logo</button>
                    </div>
                  )}
                </div>
                <button onClick={handleSaveSettings} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Certificate Modal */}
      {showCert && (
        <Certificate
          candidate={showCert.candidate}
          level={showCert.level}
          score={showCert.candidate.progress[`level${showCert.level}` as keyof typeof showCert.candidate.progress].score}
          completionDate={showCert.candidate.progress[`level${showCert.level}` as keyof typeof showCert.candidate.progress].completionDate || ''}
          companyName={settings.companyName}
          companyLogo={settings.companyLogo}
          onClose={() => setShowCert(null)}
        />
      )}
    </div>
  );
}

// ============ MAIN APP ============
function AppContent() {
  const { currentUser, isAdmin, updateProgress, getAdminSettings } = useApp();
  const [page, setPage] = useState<string>('login');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [showCert, setShowCert] = useState<number | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register' | 'admin'>('login');

  const user = currentUser;

  // Handle navigation
  const handleNavigate = (target: string, level?: number) => {
    if (target === 'lessons' && level) { setSelectedLevel(level); setPage('lessons'); }
    else if (target === 'quiz' && level) { setSelectedLevel(level); setPage('quiz'); }
    else if (target === 'certificate' && level) { setShowCert(level); setPage('dashboard'); }
    else if (target === 'profile') { setPage('profile'); }
    else if (target === 'dashboard') { setPage('dashboard'); }
  };

  // Handle quiz completion
  const handleQuizComplete = (level: number, score: number) => {
    updateProgress(level, score);
    setShowCert(level);
    setPage('dashboard');
  };

  // Render based on state
  if (isAdmin) return <AdminDashboard />;

  if (currentUser) {
    if (page === 'lessons') return <LessonsPage level={selectedLevel} onStartQuiz={() => setPage('quiz')} onBack={() => setPage('dashboard')} />;
    if (page === 'quiz') return <QuizPage level={selectedLevel} onComplete={(score) => handleQuizComplete(selectedLevel, score)} onBack={() => handleNavigate('lessons', selectedLevel)} />;
    if (page === 'profile') return <ProfilePage onBack={() => setPage('dashboard')} />;
    
    return (
      <>
        <Dashboard onNavigate={handleNavigate} />
        {showCert && user && (
          <Certificate
            candidate={user}
            level={showCert}
            score={user.progress[`level${showCert}` as keyof typeof user.progress].score}
            completionDate={user.progress[`level${showCert}` as keyof typeof user.progress].completionDate || ''}
            companyName={getAdminSettings().companyName}
            companyLogo={getAdminSettings().companyLogo}
            onClose={() => setShowCert(null)}
          />
        )}
      </>
    );
  }

  // Auth pages
  if (authView === 'register') return <RegisterPage onSwitch={() => setAuthView('login')} />;
  if (authView === 'admin') return <AdminLoginPage onBack={() => setAuthView('login')} />;
  return <LoginPage onSwitch={() => setAuthView('register')} onAdminLogin={() => setAuthView('admin')} />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
