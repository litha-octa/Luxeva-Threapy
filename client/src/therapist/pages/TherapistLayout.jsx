import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext';
import styles from './TherapistLayout.module.css';

export default function TherapistLayout() {
  const { session, loading, signOut } = useAuth();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (session?.role !== 'therapist') return <Navigate to="/therapist/login" replace />;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>Luxeva Therapist</div>
        <div className={styles.user}>
          <span className={styles.email}>{session.user.email}</span>
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
