export const mockUsers = [
  { id: '1', name: 'Student One', role: 'student', email: 'student@veltech.edu.in' },
  { id: '2', name: 'Dr. Smith', role: 'academic_admin', email: 'admin@veltech.edu.in' },
  { id: '3', name: 'Mr. Staff', role: 'staff_admin', email: 'staff@veltech.edu.in' }
];

export const mockDepartments = [
  { id: 'bca', name: 'BCA (Bachelor of Computer Applications)' },
  { id: 'bsc_cs', name: 'B.Sc Computer Science' },
  { id: 'bba', name: 'BBA' }
];

export const mockSemesters = [
  { id: 'sem1', name: 'Semester 1' },
  { id: 'sem2', name: 'Semester 2' },
  { id: 'sem3', name: 'Semester 3' },
  { id: 'sem4', name: 'Semester 4' },
  { id: 'sem5', name: 'Semester 5' },
  { id: 'sem6', name: 'Semester 6' }
];

export const mockTracks = [
  { id: 'fs', name: 'Full Stack Development', icon: 'Code' },
  { id: 'ds', name: 'Data Science & AI', icon: 'Database' },
  { id: 'uiux', name: 'UI/UX Design', icon: 'Layout' }
];

export let mockDocuments = [
  { id: 'doc1', title: 'Data Structures Notes', department: 'bca', semester: 'sem2', type: 'academic', url: '#', addedBy: 'Dr. Smith', date: '2023-10-01' },
  { id: 'doc2', title: 'React JS Fundamentals', type: 'skill', track: 'fs', url: '#', addedBy: 'Mr. Staff', date: '2023-10-05' },
  { id: 'doc3', title: 'Machine Learning Basics', type: 'skill', track: 'ds', url: '#', addedBy: 'Dr. Smith', date: '2023-10-08' },
];

export const addDocument = (doc) => {
  const newDoc = { ...doc, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString().split('T')[0] };
  mockDocuments = [...mockDocuments, newDoc];
  return newDoc;
};

export const deleteDocument = (id) => {
  mockDocuments = mockDocuments.filter(doc => doc.id !== id);
};
