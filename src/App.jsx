import TestComponent from './components/TestComponent';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Our App
        </h1>
        <TestComponent />
      </div>
    </div>
  );
}

export default App;
