import leftPanelImg from '../assets/left-panel.png';
import './LeftPanel.css';

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <img src={leftPanelImg} alt="Left Panel Design" className="left-panel-image" />
    </div>
  );
};

export default LeftPanel;
