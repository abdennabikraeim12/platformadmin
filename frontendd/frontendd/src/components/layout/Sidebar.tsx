import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  LayoutDashboard,
  Package,
  BarChart2,
 
  Settings,
  Menu,
  ListTree,
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to); 

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start my-1",
          isCollapsed ? "px-2" : "px-4",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className={cn("h-5 w-5", isCollapsed ? "mx-0" : "mr-2")} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-xl font-bold text-sidebar-foreground">E-Shop Admin</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <Menu /> : <ChevronLeft />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Tableau de bord" isCollapsed={collapsed} />
        <SidebarLink to="/products" icon={Package} label="Produits" isCollapsed={collapsed} />
        <SidebarLink to="/categories" icon={ListTree} label="Catégories" isCollapsed={collapsed} />
        <SidebarLink to="/statistics" icon={BarChart2} label="Statistiques" isCollapsed={collapsed} />
        <SidebarLink to="/settings" icon={Settings} label="Paramètres" isCollapsed={collapsed} />
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-xs text-sidebar-foreground/70">
            &copy; {new Date().getFullYear()} E-Shop Admin
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
