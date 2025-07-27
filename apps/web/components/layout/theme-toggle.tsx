'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
            className="relative p-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" style={ { top: '8px', left: '8px' } } />
        </button>
    )
}

export default ThemeToggle
