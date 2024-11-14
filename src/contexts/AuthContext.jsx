import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabase';

// Create AuthContext
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial check for active session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    // Subscribe to changes in auth state
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Authentication functions
  const signIn = async (email, password) => {
    setError(null); // Clear any previous error
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  const signUp = async (email, password) => {
    setError(null); // Clear any previous error
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    setError(null); // Clear any previous error
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  const clearError = () => setError(null);

  // Context value containing everything we need
  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export both AuthContext and AuthProvider
export { AuthContext };
