// AI Module Configuration System
// Centralized control for all AI service interactions

interface AIConfig {
    enabled: boolean;
    lastToggled: number;
    debugMode: boolean;
}

const AI_CONFIG_KEY = 'nadi_ai_config';

// Default configuration - AI is DISABLED by default as requested
const DEFAULT_CONFIG: AIConfig = {
    enabled: false, // Set to false as requested
    lastToggled: Date.now(),
    debugMode: false
};

class AIConfigManager {
    private config: AIConfig;
    private listeners: Set<(config: AIConfig) => void> = new Set();

    constructor() {
        this.config = this.loadConfig();
    }

    private loadConfig(): AIConfig {
        try {
            const stored = localStorage.getItem(AI_CONFIG_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DEFAULT_CONFIG, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load AI config from localStorage:', error);
        }
        return { ...DEFAULT_CONFIG };
    }

    private saveConfig(): void {
        try {
            localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(this.config));
            this.notifyListeners();
        } catch (error) {
            console.error('Failed to save AI config to localStorage:', error);
        }
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => {
            try {
                listener(this.config);
            } catch (error) {
                console.error('Error in AI config listener:', error);
            }
        });
    }

    // Get current configuration
    getConfig(): AIConfig {
        return { ...this.config };
    }

    // Check if AI is enabled
    isEnabled(): boolean {
        return this.config.enabled;
    }

    // Enable AI module
    enable(): void {
        if (!this.config.enabled) {
            this.config.enabled = true;
            this.config.lastToggled = Date.now();
            this.saveConfig();
            console.log('🤖 AI Module ENABLED');
        }
    }

    // Disable AI module
    disable(): void {
        if (this.config.enabled) {
            this.config.enabled = false;
            this.config.lastToggled = Date.now();
            this.saveConfig();
            console.log('🚫 AI Module DISABLED - Using mock data');
        }
    }

    // Toggle AI module
    toggle(): boolean {
        if (this.config.enabled) {
            this.disable();
        } else {
            this.enable();
        }
        return this.config.enabled;
    }

    // Set debug mode
    setDebugMode(enabled: boolean): void {
        this.config.debugMode = enabled;
        this.saveConfig();
    }

    // Subscribe to configuration changes
    subscribe(listener: (config: AIConfig) => void): () => void {
        this.listeners.add(listener);

        // Return unsubscribe function
        return () => {
            this.listeners.delete(listener);
        };
    }

    // Get status string for debugging
    getStatusString(): string {
        return `AI Module: ${this.config.enabled ? 'ENABLED' : 'DISABLED'} | Debug: ${this.config.debugMode ? 'ON' : 'OFF'} | Last toggled: ${new Date(this.config.lastToggled).toLocaleString()}`;
    }
}

// Create singleton instance
export const aiConfig = new AIConfigManager();

// Export types and utilities
export type { AIConfig };

// Utility functions
export const isAIEnabled = (): boolean => aiConfig.isEnabled();
export const enableAI = (): void => aiConfig.enable();
export const disableAI = (): void => aiConfig.disable();
export const toggleAI = (): boolean => aiConfig.toggle();

// React hook for components to subscribe to AI config changes
import { useEffect, useState } from 'react';

export function useAIConfig() {
    const [config, setConfig] = useState<AIConfig>(aiConfig.getConfig());

    useEffect(() => {
        const unsubscribe = aiConfig.subscribe(setConfig);
        return unsubscribe;
    }, []);

    return {
        config,
        isEnabled: config.enabled,
        toggle: () => aiConfig.toggle(),
        enable: () => aiConfig.enable(),
        disable: () => aiConfig.disable(),
        setDebugMode: (enabled: boolean) => aiConfig.setDebugMode(enabled)
    };
}
