import React from 'react';
import { FileText, Home, LayoutTemplate, User, Settings, Search, Bell } from 'lucide-react';

const HomePageHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold">Resumind</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
              <Home className="h-4 w-4 mr-1" /> Home
            </a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
              <LayoutTemplate className="h-4 w-4 mr-1" /> Templates
            </a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
              <User className="h-4 w-4 mr-1" /> My Resume
            </a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
              <Settings className="h-4 w-4 mr-1" /> Settings
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-900">
              <Bell className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center h-8 w-8 bg-blue-600 text-white rounded-full">
              T
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;
