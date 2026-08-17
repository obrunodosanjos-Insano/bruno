import React from 'react';
import { ShoppingBag, User, Sun, Moon } from 'lucide-react';
import { TostadoLogoIcon } from './TostadoLogoIcon';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation?: () => void;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  userProfile?: UserProfile | null;
  onOpenProfile?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  setActiveSection,
  userProfile,
  onOpenProfile,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#181513]/95 backdrop-blur-md text-stone-900 dark:text-stone-100 border-b border-stone-200/60 dark:border-stone-800/80 shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left Spacer for desktop symmetry so brand logo stays centered */}
        <div className="hidden md:flex items-center w-1/4">
        </div>

        {/* Center: Brand Logo & Name "TOSTADO" */}
        <button 
          onClick={() => {
            if (setActiveSection) setActiveSection('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-stone-950 dark:bg-stone-900 border border-transparent dark:border-stone-700 flex items-center justify-center text-white shadow-xs group-hover:bg-stone-800 dark:group-hover:bg-stone-800 transition-colors duration-200">
            <TostadoLogoIcon className="w-5 h-5 text-amber-300" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50 font-display">
            TOSTADO
          </span>
        </button>

        {/* Right: Dark Mode Toggle, "Meu Perfil" & "Meus Pedidos" Tabs */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 md:w-1/4">
          {/* Dark Mode Toggle Button in Navbar */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:p-2.5 rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center justify-center"
              id="btn-nav-dark-mode"
              aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
              title={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>
          )}

          {/* Perfil Tab */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-400 dark:hover:border-stone-500 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            id="btn-nav-profile"
            title={userProfile ? 'Ver seu Perfil' : 'Criar Perfil do Cliente'}
          >
            {userProfile ? (
              <>
                <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-extrabold uppercase shrink-0">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-xs truncate max-w-[70px] sm:max-w-[110px]">
                  {userProfile.name.split(' ')[0]}
                </span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-stone-700 dark:text-stone-300 shrink-0" />
                <span className="text-xs font-bold hidden xs:inline">Meu Perfil</span>
              </>
            )}
          </button>

          {/* Meus Pedidos Tab */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2 rounded-full bg-stone-950 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 font-bold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95 shrink-0"
            id="btn-nav-cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300 dark:text-stone-950" />
            <span className="tracking-wide hidden sm:inline">Meus Pedidos</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-stone-950 text-[10px] sm:text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};



