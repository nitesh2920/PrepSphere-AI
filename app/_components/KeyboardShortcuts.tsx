'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, X, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsProps {
  type: 'flashcards' | 'quiz' | 'notes' | 'qa';
  onClose?: () => void;
}

const shortcuts = {
  flashcards: [
    { keys: ['←', 'A'], action: 'Previous card', icon: <ArrowLeft className="w-4 h-4" /> },
    { keys: ['→', 'D'], action: 'Next card', icon: <ArrowRight className="w-4 h-4" /> },
    { keys: ['Space', '↑', '↓', 'F'], action: 'Flip card', icon: <RotateCcw className="w-4 h-4" /> },
    { keys: ['R'], action: 'Reset to first', icon: <RotateCcw className="w-4 h-4" /> },
  ],
  quiz: [
    { keys: ['←', 'A'], action: 'Previous question', icon: <ArrowLeft className="w-4 h-4" /> },
    { keys: ['→', 'D'], action: 'Next question', icon: <ArrowRight className="w-4 h-4" /> },
    { keys: ['1', '2', '3', '4'], action: 'Select option', icon: <span className="w-4 h-4 text-xs font-bold">1-4</span> },
    { keys: ['Enter'], action: 'Submit answer', icon: <span className="w-4 h-4 text-xs font-bold">⏎</span> },
  ],
  notes: [
    { keys: ['←', 'A'], action: 'Previous page', icon: <ArrowLeft className="w-4 h-4" /> },
    { keys: ['→', 'D'], action: 'Next page', icon: <ArrowRight className="w-4 h-4" /> },
    { keys: ['Space'], action: 'Mark complete', icon: <span className="w-4 h-4 text-xs font-bold">✓</span> },
  ],
  qa: [
    { keys: ['←', 'A'], action: 'Previous question', icon: <ArrowLeft className="w-4 h-4" /> },
    { keys: ['→', 'D'], action: 'Next question', icon: <ArrowRight className="w-4 h-4" /> },
    { keys: ['Space'], action: 'Mark complete', icon: <span className="w-4 h-4 text-xs font-bold">✓</span> },
  ],
};

export default function KeyboardShortcuts({ type, onClose }: KeyboardShortcutsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [showMinimized, setShowMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
    if (mobile) return;

    // Check if shortcuts have been shown for this type
    const storageKey = `keyboard-shortcuts-shown-${type}`;
    const hasBeenShown = localStorage.getItem(storageKey);

    if (!hasBeenShown) {
      // Show after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem(storageKey, 'true');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // If already shown before, show minimized icon
      setShowMinimized(true);
    }
  }, [type]);

  const handleClose = () => {
    setIsVisible(false);
    setShowMinimized(true);
    onClose?.();
  };

  const handleMinimizedClick = () => {
    setIsVisible(true);
    setShowMinimized(false);
  };

  const currentShortcuts = shortcuts[type] || [];

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Minimized Icon */}
      <AnimatePresence>
        {showMinimized && !isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={handleMinimizedClick}
              className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              title="Show keyboard shortcuts"
            >
              <Keyboard className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Shortcuts Panel */}
      <AnimatePresence>
        {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <Card className="border-2 border-primary/20 shadow-xl bg-background/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm">Keyboard Shortcuts</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {currentShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {shortcut.icon}
                      <span className="text-muted-foreground">{shortcut.action}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          {keyIndex > 0 && <span className="text-muted-foreground text-xs">or</span>}
                          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border">
                            {key}
                          </kbd>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  This notification won't show again
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}