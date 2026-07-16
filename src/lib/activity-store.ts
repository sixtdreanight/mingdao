export interface ActivityEntry {
  id: string;
  type: 'chat' | 'competency' | 'profile_update' | 'resource_save' | 'first_visit';
  title: string;
  detail?: string;
  timestamp: string;
}

const STORAGE_KEY = 'mingdao-activity';

export function getActivities(): ActivityEntry[] {
  return [];
}

export function addActivity(_entry: Omit<ActivityEntry, 'id' | 'timestamp'>): void {
  // Stub — will be fully implemented in Task 5
}

export function getStats() {
  return {
    totalConversations: 0,
    competencyAssessments: 0,
    resourceSaves: 0,
    firstVisit: undefined as string | undefined,
  };
}
