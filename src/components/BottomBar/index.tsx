import './styles.css';
import GoToHomeButton from './components/GoToHomeButton';
import DateTimeDisplay from './components/DateTimeDisplay';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function BottomBar() {
  return (
    <footer className="footer-area">
      <div className="container flex">
        <div className="flex buttons-div">
          <GoToHomeButton />
          <LanguageSwitcher />
        </div>
        <div className="flex">
          <DateTimeDisplay />
        </div>
      </div>
    </footer>
  );
}
