import React, { useState, createContext, useContext, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen, User, LogOut, FileText, Upload, Trash2, Library, BookMarked,
  Search, LayoutDashboard, GraduationCap, Code, Database, Palette,
  ChevronRight, Plus, X, Menu, FolderOpen, Calendar, Eye,
  Users, TrendingUp, Sparkles, ExternalLink
} from 'lucide-react';
import { mockUsers, mockDepartments, mockSemesters, mockTracks, mockDocuments, addDocument, deleteDocument } from './mockData';

/* =============================================
   AUTH CONTEXT
   ============================================= */
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (role) => setUser(mockUsers.find(u => u.role === role));
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* =============================================
   LOGIN PAGE
   ============================================= */
const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  const handleLogin = (role) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Left hero panel */}
      <div className="login-hero">
        <div className="login-hero-content animate-fade-in">
          <img src="./logo.png" alt="Vel Tech Logo" className="login-hero-logo" />
          <h1>Vel Tech Ranga Sanku</h1>
          <p className="login-hero-subtitle">Arts College — Document Archive</p>
          <p>
            Your centralized hub for academic notes, semester documents,
            and career-ready skill tracks. Access everything you need
            to excel in your academic journey.
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div className="login-form-section">
        <div className="login-form-wrap animate-slide-up">
          <h2>Sign In</h2>
          <p>Choose your role to access the archive</p>

          <button className="login-role-btn" onClick={() => handleLogin('student')}>
            <div className="role-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
              <GraduationCap size={22} />
            </div>
            <div className="role-info">
              <span className="role-title">Student</span>
              <span className="role-desc">View & download documents</span>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          <button className="login-role-btn" onClick={() => handleLogin('academic_admin')}>
            <div className="role-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
              <BookOpen size={22} />
            </div>
            <div className="role-info">
              <span className="role-title">Academic Admin</span>
              <span className="role-desc">Manage academic documents</span>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>

          <button className="login-role-btn" onClick={() => handleLogin('staff_admin')}>
            <div className="role-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
              <Library size={22} />
            </div>
            <div className="role-info">
              <span className="role-title">Staff Admin</span>
              <span className="role-desc">Manage all archives & skills</span>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* =============================================
   SIDEBAR
   ============================================= */
const trackIcons = { fs: Code, ds: Database, uiux: Palette };

const Sidebar = ({ activeTab, setActiveTab, selectedDept, setSelectedDept, selectedSem, setSelectedSem, selectedTrack, setSelectedTrack, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleBg = user?.role === 'academic_admin'
    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
    : user?.role === 'staff_admin'
      ? 'linear-gradient(135deg, #10b981, #059669)'
      : 'linear-gradient(135deg, #3b82f6, #1e40af)';

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <img src="./logo.png" alt="Logo" className="sidebar-logo" />
        <div className="sidebar-brand">
          <h2>Vel Tech Archive</h2>
          <span>Document Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Main Navigation */}
        <div className="sidebar-section-label">Navigation</div>

        <button
          className={`sidebar-link ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => { setActiveTab('academic'); setMobileOpen(false); }}
        >
          <BookOpen size={18} />
          <span>Academic Notes</span>
        </button>

        <button
          className={`sidebar-link ${activeTab === 'skill' ? 'active' : ''}`}
          onClick={() => { setActiveTab('skill'); setMobileOpen(false); }}
        >
          <Sparkles size={18} />
          <span>Skill Tracks</span>
        </button>

        {/* Departments (visible only on academic tab) */}
        {activeTab === 'academic' && (
          <>
            <div className="sidebar-section-label">Department</div>
            {mockDepartments.map(dept => (
              <button
                key={dept.id}
                className={`sidebar-link ${selectedDept === dept.id ? 'active' : ''}`}
                onClick={() => { setSelectedDept(dept.id); setMobileOpen(false); }}
              >
                <FolderOpen size={16} />
                <span>{dept.name.split('(')[0].trim()}</span>
              </button>
            ))}

            <div className="sidebar-section-label">Semester</div>
            {mockSemesters.map(sem => (
              <button
                key={sem.id}
                className={`sidebar-link ${selectedSem === sem.id ? 'active' : ''}`}
                onClick={() => { setSelectedSem(sem.id); setMobileOpen(false); }}
              >
                <Calendar size={16} />
                <span>{sem.name}</span>
              </button>
            ))}
          </>
        )}

        {/* Skill Tracks (visible only on skill tab) */}
        {activeTab === 'skill' && (
          <>
            <div className="sidebar-section-label">Learning Tracks</div>
            {mockTracks.map(track => {
              const Icon = trackIcons[track.id] || Code;
              return (
                <button
                  key={track.id}
                  className={`sidebar-link ${selectedTrack === track.id ? 'active' : ''}`}
                  onClick={() => { setSelectedTrack(track.id); setMobileOpen(false); }}
                >
                  <Icon size={16} />
                  <span>{track.name}</span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{ background: roleBg }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-role">{user?.role?.replace('_', ' ')}</div>
          </div>
          <button className="btn-icon" onClick={handleLogout} data-tooltip="Sign Out" style={{ width: '32px', height: '32px' }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

/* =============================================
   ADD DOCUMENT MODAL
   ============================================= */
const AddDocumentModal = ({ onClose, onAdd, activeTab, selectedDept, selectedSem, selectedTrack }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), url: url.trim() || '#' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload New Document</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Document Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Python Programming — Unit 1 Notes"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Document Link (optional)</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://drive.google.com/..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-glow)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            {activeTab === 'academic'
              ? `Adding to ${mockDepartments.find(d => d.id === selectedDept)?.name} → ${mockSemesters.find(s => s.id === selectedSem)?.name}`
              : `Adding to ${mockTracks.find(t => t.id === selectedTrack)?.name}`
            }
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Upload size={16} /> Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =============================================
   DASHBOARD
   ============================================= */
const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('academic');
  const [selectedDept, setSelectedDept] = useState(mockDepartments[0].id);
  const [selectedSem, setSelectedSem] = useState(mockSemesters[0].id);
  const [selectedTrack, setSelectedTrack] = useState(mockTracks[0].id);
  const [docs, setDocs] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user?.role === 'academic_admin' || user?.role === 'staff_admin';

  const filteredDocs = useMemo(() => {
    let result = docs.filter(doc => {
      if (activeTab === 'academic') {
        return doc.type === 'academic' && doc.department === selectedDept && doc.semester === selectedSem;
      }
      return doc.type === 'skill' && doc.track === selectedTrack;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(doc => doc.title.toLowerCase().includes(q));
    }

    return result;
  }, [docs, activeTab, selectedDept, selectedSem, selectedTrack, searchQuery]);

  const handleAdd = ({ title, url }) => {
    const newDoc = {
      title,
      type: activeTab,
      addedBy: user.name,
      url
    };
    if (activeTab === 'academic') {
      newDoc.department = selectedDept;
      newDoc.semester = selectedSem;
    } else {
      newDoc.track = selectedTrack;
    }
    const added = addDocument(newDoc);
    setDocs(prev => [...prev, added]);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
      setDocs(prev => prev.filter(d => d.id !== id));
    }
  };

  const totalAcademic = docs.filter(d => d.type === 'academic').length;
  const totalSkill = docs.filter(d => d.type === 'skill').length;
  const currentSectionTitle = activeTab === 'academic'
    ? `${mockDepartments.find(d => d.id === selectedDept)?.name}`
    : mockTracks.find(t => t.id === selectedTrack)?.name;

  return (
    <div className="app-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        selectedSem={selectedSem}
        setSelectedSem={setSelectedSem}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="main-content">
        {/* Top Bar */}
        <div className="topbar">
          <div className="topbar-left">
            <button className="btn-icon" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none' }}>
              <Menu size={20} />
            </button>
            <div>
              <div className="topbar-title">
                {activeTab === 'academic' ? '📚 Academic Notes' : '🚀 Skill Tracks'}
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            {isAdmin && (
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={16} /> Add Document
              </button>
            )}
          </div>
        </div>

        {/* Main Page */}
        <div className="page-content">
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card animate-slide-up">
              <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                <FileText size={20} />
              </div>
              <div className="stat-label">Total Documents</div>
              <div className="stat-value">{docs.length}</div>
            </div>
            <div className="stat-card animate-slide-up" style={{ animationDelay: '50ms' }}>
              <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
                <BookOpen size={20} />
              </div>
              <div className="stat-label">Academic Notes</div>
              <div className="stat-value">{totalAcademic}</div>
            </div>
            <div className="stat-card accent animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                <TrendingUp size={20} />
              </div>
              <div className="stat-label">Skill Resources</div>
              <div className="stat-value">{totalSkill}</div>
            </div>
            <div className="stat-card animate-slide-up" style={{ animationDelay: '150ms' }}>
              <div className="stat-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                <Users size={20} />
              </div>
              <div className="stat-label">Your Role</div>
              <div className="stat-value" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                {user?.role === 'student' ? 'Student' : user?.role === 'academic_admin' ? 'Academic Admin' : 'Staff Admin'}
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{currentSectionTitle}</h2>
              {activeTab === 'academic' && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                  {mockSemesters.find(s => s.id === selectedSem)?.name} • {filteredDocs.length} document{filteredDocs.length !== 1 ? 's' : ''}
                </p>
              )}
              {activeTab === 'skill' && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                  {filteredDocs.length} resource{filteredDocs.length !== 1 ? 's' : ''} available
                </p>
              )}
            </div>
          </div>

          {/* Documents Grid */}
          {filteredDocs.length === 0 ? (
            <div className="empty-state card animate-fade-in">
              <div className="empty-state-icon">
                <FolderOpen size={36} />
              </div>
              <h3>No documents found</h3>
              <p>
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search.`
                  : isAdmin
                    ? 'This section is empty. Click "Add Document" to upload the first one.'
                    : 'No documents have been uploaded for this section yet.'
                }
              </p>
            </div>
          ) : (
            <div className="docs-grid stagger">
              {filteredDocs.map(doc => (
                <div key={doc.id} className="doc-card">
                  <div className="doc-card-header">
                    <div className="doc-icon-wrap">
                      <FileText size={22} />
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                      {doc.type === 'academic' ? 'NOTES' : 'SKILL'}
                    </span>
                  </div>

                  <h4 className="doc-card-title">{doc.title}</h4>
                  <p className="doc-card-meta">
                    Uploaded by {doc.addedBy} • {doc.date}
                  </p>

                  <div className="doc-card-footer">
                    <a
                      href={doc.url}
                      className="btn btn-sm btn-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye size={14} /> View
                    </a>

                    {isAdmin && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Document Modal */}
      {showModal && (
        <AddDocumentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
          activeTab={activeTab}
          selectedDept={selectedDept}
          selectedSem={selectedSem}
          selectedTrack={selectedTrack}
        />
      )}
    </div>
  );
};

/* =============================================
   PROTECTED ROUTE
   ============================================= */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

/* =============================================
   APP ROOT
   ============================================= */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
