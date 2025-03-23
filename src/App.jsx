import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
