'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

export type MutationOperationType =
  | 'create'
  | 'update'
  | 'delete'
  | 'upload'
  | 'checkout'
  | 'auth'
  | 'cart'
  | 'default';

export interface LoadingContextValue {
  isNavigating: boolean;
  isMutating: boolean;
  isLoading: boolean;
  isExiting: boolean;
  loaderMessage: string;
  mutationMessage: string;
  operationType: MutationOperationType;
  showLoader: (message?: string, mode?: 'navigation' | 'mutation') => void;
  hideLoader: () => void;
  startNavigation: (message?: string) => void;
  stopNavigation: () => void;
  startLoading: (message?: string, operation?: MutationOperationType) => void;
  stopLoading: () => void;
  withSkeleton: <T>(
    action: () => Promise<T>,
    message?: string,
    operation?: MutationOperationType
  ) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

function installCircularSafeJsonAndConsole() {
  if (typeof window === 'undefined') return;
  const win = window as unknown as Record<string, unknown>;
  if (win.__smfSafeJsonInstalled) return;
  win.__smfSafeJsonInstalled = true;

  const originalStringify = JSON.stringify.bind(JSON);

  // Safe JSON.stringify wrapper that falls back to circular/DOM-safe replacer only if native stringify throws
  const safeStringify = (
    value: unknown,
    replacer?: unknown,
    space?: string | number
  ): string => {
    try {
      return originalStringify(
        value,
        replacer as (key: string, value: unknown) => unknown,
        space
      );
    } catch {
      const seen = new WeakSet<object>();
      const fallbackReplacer = function (this: unknown, key: string, val: unknown): unknown {
        if (
          key &&
          (key.startsWith('__reactFiber$') ||
            key.startsWith('__reactProps$') ||
            key.startsWith('__reactContainer$') ||
            key.startsWith('__reactEvents$') ||
            key === 'stateNode' ||
            key === '_owner')
        ) {
          return undefined;
        }
        if (typeof val === 'object' && val !== null) {
          if (typeof Node !== 'undefined' && val instanceof Node) {
            return `[DOMNode <${val.nodeName.toLowerCase()}>]`;
          }
          if (typeof Window !== 'undefined' && val instanceof Window) {
            return '[Window]';
          }
          if (typeof Event !== 'undefined' && val instanceof Event) {
            return `[Event ${val.type}]`;
          }
          if (seen.has(val)) {
            return '[Circular]';
          }
          seen.add(val);
        }
        if (typeof replacer === 'function') {
          return (replacer as (this: unknown, k: string, v: unknown) => unknown).call(
            this,
            key,
            val
          );
        }
        return val;
      };
      return originalStringify(value, fallbackReplacer, space);
    }
  };

  JSON.stringify = safeStringify as typeof JSON.stringify;

  const sanitizeConsoleArg = (arg: unknown): unknown => {
    if (!arg || typeof arg !== 'object') return arg;
    if (typeof Element !== 'undefined' && arg instanceof Element) {
      return `[DOMElement <${arg.tagName.toLowerCase()}>]`;
    }
    if (typeof Node !== 'undefined' && arg instanceof Node) {
      return `[DOMNode <${arg.nodeName.toLowerCase()}>]`;
    }
    if (arg instanceof Error) {
      return arg.stack || `${arg.name}: ${arg.message}`;
    }
    return arg;
  };

  (['error', 'warn', 'log', 'info', 'debug'] as const).forEach((method) => {
    const orig = window.console[method];
    if (typeof orig === 'function') {
      window.console[method] = (...args: unknown[]) => {
        orig.apply(window.console, args.map(sanitizeConsoleArg));
      };
    }
  });
}

// Install immediately when module loads on client
if (typeof window !== 'undefined') {
  installCircularSafeJsonAndConsole();
}

function sanitizeMessage(input: unknown, fallback: string): string {
  if (typeof input === 'string' && input.trim().length > 0) {
    return input;
  }
  return fallback;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState<string>(
    'Preparing Royal Atelier...'
  );
  const [operationType, setOperationType] =
    useState<MutationOperationType>('default');

  const mutationCountRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prevent circular DOM/Fiber nodes in console/JSON from crashing iframe JSON serializers
  useEffect(() => {
    installCircularSafeJsonAndConsole();
  }, []);

  const clearTimers = useCallback(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const triggerGracefulExit = useCallback((onExited: () => void) => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
    }
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      onExited();
      setIsExiting(false);
    }, 280);
  }, []);

  const startNavigation = useCallback(
    (message?: string) => {
      const safeMsg = sanitizeMessage(message, 'Entering Royal Collection...');
      clearTimers();
      isNavigatingRef.current = true;
      setIsExiting(false);
      setLoaderMessage(safeMsg);
      setIsNavigating(true);

      // Safety fallback so navigation loader never hangs indefinitely
      navigationTimeoutRef.current = setTimeout(() => {
        if (!isNavigatingRef.current) return;
        isNavigatingRef.current = false;
        triggerGracefulExit(() => {
          setIsNavigating(false);
        });
      }, 4500);
    },
    [clearTimers, triggerGracefulExit]
  );

  const stopNavigation = useCallback(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    if (!isNavigatingRef.current) {
      return;
    }
    isNavigatingRef.current = false;

    if (mutationCountRef.current > 0) {
      setIsNavigating(false);
      return;
    }
    triggerGracefulExit(() => {
      setIsNavigating(false);
    });
  }, [triggerGracefulExit]);

  const startLoading = useCallback(
    (
      message?: string,
      operation: MutationOperationType = 'default'
    ) => {
      const safeMsg = sanitizeMessage(message, 'Updating Catalog...');
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
      mutationCountRef.current += 1;
      setIsExiting(false);
      setLoaderMessage(safeMsg);
      setOperationType(operation);
      setIsMutating(true);
    },
    []
  );

  const stopLoading = useCallback(() => {
    mutationCountRef.current = Math.max(0, mutationCountRef.current - 1);
    if (mutationCountRef.current === 0) {
      triggerGracefulExit(() => {
        setIsMutating(false);
        setOperationType('default');
      });
    }
  }, [triggerGracefulExit]);

  const showLoader = useCallback(
    (
      message?: string,
      mode: 'navigation' | 'mutation' = 'navigation'
    ) => {
      const safeMsg = sanitizeMessage(message, 'Processing Request...');
      if (mode === 'mutation') {
        startLoading(safeMsg, 'default');
      } else {
        startNavigation(safeMsg);
      }
    },
    [startLoading, startNavigation]
  );

  const hideLoader = useCallback(() => {
    mutationCountRef.current = 0;
    isNavigatingRef.current = false;
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    triggerGracefulExit(() => {
      setIsNavigating(false);
      setIsMutating(false);
      setOperationType('default');
    });
  }, [triggerGracefulExit]);

  const withSkeleton = useCallback(
    async <T,>(
      action: () => Promise<T>,
      message = 'Updating Catalog...',
      operation: MutationOperationType = 'default'
    ): Promise<T> => {
      const safeMsg = sanitizeMessage(message, 'Updating Catalog...');
      startLoading(safeMsg, operation);
      try {
        const result = await action();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const isLoading = isNavigating || isMutating;

  return (
    <LoadingContext.Provider
      value={{
        isNavigating,
        isMutating,
        isLoading,
        isExiting,
        loaderMessage,
        mutationMessage: loaderMessage,
        operationType,
        showLoader,
        hideLoader,
        startNavigation,
        stopNavigation,
        startLoading,
        stopLoading,
        withSkeleton,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextValue {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
