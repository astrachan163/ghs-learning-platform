import './App.css';
import ParentDashboard from './pages/ParentDashboard';
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  // Basic router simulation
  // In a real app, you would use a library like React Router.
  let component = <ParentDashboard />;

  return (
    <>
      <nav style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h2>Georgia Homeschool Platform (Skeleton)</h2>
        {/* Add links here to switch components */}
      </nav>
      <main>
        {component}
      </main>
    </>
  )
}

export default App;
