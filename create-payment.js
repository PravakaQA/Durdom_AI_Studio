/**
 * IMPORTANT: This is a Mock Storage for demonstration purposes.
 * Vercel Serverless functions are stateless, meaning this in-memory object 
 * will NOT persist across different requests or multiple server instances.
 * 
 * TO MAKE THIS PRODUCTION-READY:
 * Replace this logic with a real database like Vercel KV, Upstash Redis, or Supabase.
 */

// In-memory mock storage (Temporary solution)
const orders = new Map();

export const storage = {
  /**
   * Save order status
   * @param {string} orderId 
   * @param {object} data { status: 'paid' | 'pending', product: string, ... }
   */
  async set(orderId, data) {
    console.log(`[Storage] Setting order ${orderId}:`, data);
    orders.set(orderId, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  },

  /**
   * Get order status
   * @param {string} orderId 
   * @returns {object|null}
   */
  async get(orderId) {
    const data = orders.get(orderId);
    console.log(`[Storage] Getting order ${orderId}:`, data || 'Not found');
    return data || null;
  }
};
