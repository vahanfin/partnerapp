// This file will be removed later when we implement actual authentication
export const dummyAuth = {
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, accept any email/password combination
    return { error: null };
  }
};