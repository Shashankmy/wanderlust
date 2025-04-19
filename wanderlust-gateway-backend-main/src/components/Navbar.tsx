
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-bold text-wanderlust-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
              <path d="M12 13V8"/>
              <path d="M15 10l-3 3-3-3"/>
            </svg>
            Wanderlust
          </NavLink>
        </div>
        
        {isMobile ? (
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6">
              <NavLink to="/" 
                className={({ isActive }) => 
                  cn("navbar-link", isActive && "active-link text-wanderlust-primary")
                }
              >
                Home
              </NavLink>
              <NavLink to="/destinations"
                className={({ isActive }) => 
                  cn("navbar-link", isActive && "active-link text-wanderlust-primary")
                }
              >
                Destinations
              </NavLink>
              <NavLink to="/about"
                className={({ isActive }) => 
                  cn("navbar-link", isActive && "active-link text-wanderlust-primary")
                }
              >
                About
              </NavLink>
              <NavLink to="/contact"
                className={({ isActive }) => 
                  cn("navbar-link", isActive && "active-link text-wanderlust-primary")
                }
              >
                Contact
              </NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 transition-colors" />
              </a>
            </div>
          </>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="flex flex-col items-center py-8 space-y-6">
            <NavLink to="/" 
              className={({ isActive }) => 
                cn("text-xl navbar-link", isActive && "active-link text-wanderlust-primary")
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink to="/destinations"
              className={({ isActive }) => 
                cn("text-xl navbar-link", isActive && "active-link text-wanderlust-primary")
              }
              onClick={toggleMenu}
            >
              Destinations
            </NavLink>
            <NavLink to="/about"
              className={({ isActive }) => 
                cn("text-xl navbar-link", isActive && "active-link text-wanderlust-primary")
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink to="/contact"
              className={({ isActive }) => 
                cn("text-xl navbar-link", isActive && "active-link text-wanderlust-primary")
              }
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            
            <div className="flex items-center gap-6 pt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6 text-gray-600 hover:text-pink-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
