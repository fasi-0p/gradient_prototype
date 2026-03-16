import React from 'react';
import { FloatingNav } from '../ui/floating-navbar';
import { Home, User, Users, Calendar, Laptop, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <User className="h-4 w-4 text-white" />,
    },
    {
      name: "Team",
      link: "/team",
      icon: <Users className="h-4 w-4 text-white" />,
    },
    {
      name: "Events",
      link: "/events",
      icon: <Calendar className="h-4 w-4 text-white" />,
    },
    {
      name: "Mel Dept.",
      link: "/meldept",
      icon: <Laptop className="h-4 w-4 text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <MessageSquare className="h-4 w-4 text-white" />,
    }
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;