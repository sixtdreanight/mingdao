export interface ActivityEntry {
  id: string;
  type: 'chat' | 'competency' | 'profile_update' | 'resource_save' | 'first_visit';
  title: string;
  detail?: string;
  timestamp: string;
}

const STORAGE_KEY = 'mingdao-activity';

export function getActivities(): ActivityEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addActivity(entry: Omit<ActivityEntry, 'id' | 'timestamp'>): void {
  const activities = getActivities();
  const newEntry: ActivityEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
  };
  activities.unshift(newEntry);
  // 保留最近 50 条
  if (activities.length > 50) activities.length = 50;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  } catch { /* ignore */ }
}

export function getStats() {
  const activities = getActivities();
  return {
    totalConversations: activities.filter((a) => a.type === 'chat').length,
    competencyAssessments: activities.filter((a) => a.type === 'competency').length,
    resourceSaves: activities.filter((a) => a.type === 'resource_save').length,
    firstVisit: activities.find((a) => a.type === 'first_visit')?.timestamp,
  };
}
