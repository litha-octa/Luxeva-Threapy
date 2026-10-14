import LoginPage from '../../shared/components/LoginPage/LoginPage';

export default function Login() {
  return (
    <LoginPage
      title="Luxeva Therapist"
      subtitle="Masuk untuk melihat jadwal kamu"
      role="therapist"
      redirectTo="/therapist"
    />
  );
}
