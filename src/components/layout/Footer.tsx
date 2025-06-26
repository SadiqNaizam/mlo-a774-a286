import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
            &copy; {currentYear} CommerceBoard. All Rights Reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;