/**
 * Basic Analytics Utility
 * 
 * In a production environment, these functions would connect to a real analytics 
 * service like Google Analytics, Mixpanel, Plausible, or a custom backend.
 * For this implementation, we log to the console and can optionally store in localStorage.
 */

export const trackToolView = (toolId: string, toolName: string) => {
  const timestamp = new Date().toISOString();
  console.log(`📊 [Analytics] Tool Loaded: ${toolName} (${toolId}) at ${timestamp}`);
  
  // Example of saving to localStorage for basic persistent tracking
  try {
    const stats = JSON.parse(localStorage.getItem('freetools_analytics') || '{"views": {}, "actions": {}}');
    stats.views[toolId] = (stats.views[toolId] || 0) + 1;
    localStorage.setItem('freetools_analytics', JSON.stringify(stats));
  } catch (e) {
    // Ignore localStorage errors
  }
};

export const trackToolAction = (toolId: string, actionName: string, metadata?: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(`⚡ [Analytics] Action Performed: [${toolId}] ${actionName}`, metadata || '');
  
  try {
    const stats = JSON.parse(localStorage.getItem('freetools_analytics') || '{"views": {}, "actions": {}}');
    const actionKey = `${toolId}:${actionName}`;
    stats.actions[actionKey] = (stats.actions[actionKey] || 0) + 1;
    localStorage.setItem('freetools_analytics', JSON.stringify(stats));
  } catch (e) {
    // Ignore localStorage errors
  }
};
