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
      <nav className="portal-nav">
        <h2>MaQkrs Learn</h2>
        {/* Add links here to switch components */}
      </nav>
      <main>
        {component}
      </main>
    </>
  )
}

export default App;
