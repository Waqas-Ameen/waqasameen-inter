import GoogleIcon from './GoogleIcon';
import LinkedInIcon from './LinkedInIcon';
import AppleIcon from './AppleIcon';

const SocialLogin = ({ provider }) => {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return <GoogleIcon />;
      case 'linkedin':
        return <LinkedInIcon />;
      case 'apple':
        return <AppleIcon />;
      default:
        return null;
    }
  };

  return (
    <button className="social-login-btn" type="button" aria-label={`Login with ${provider}`}>
      {getIcon()}
    </button>
  );
};

export default SocialLogin;
