import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import validateRegistrationForm from './services/formValidation/validateRegistrationForm';
import toastr from 'toastr';
import 'toastr/toastr.scss';
const regeneratorRuntime = require("regenerator-runtime");

class Pie {
  constructor() {
    this.whiteMomsCount = 0;
    this.fasterOvensCount = 0;
    this.blastOvensCount = 0;
    this.pieCount = 0;
    this.pieGenerationRate = 0;

    this.upgradeCosts = {
      whiteMoms: 100,
      fasterOvens: 2000,
      blastOvens: 6000,
    };

    this.buyUpgrade = this.buyUpgrade.bind(this);
    this.changeImageSize = this.changeImageSize.bind(this);
    this.generatePies = this.generatePies.bind(this);
    this.addPieOnClick = this.addPieOnClick.bind(this);
    this.playButtonClickSound = this.playButtonClickSound.bind(this);
    this.startMusic = this.startMusic.bind(this);

    const whiteMomsButton = document.getElementById('whiteMomsButton');
    whiteMomsButton.addEventListener('click', () => {
      this.buyUpgrade('whiteMoms');
      this.playButtonClickSound();
    });

    const fasterOvensButton = document.getElementById('fasterOvensButton');
    fasterOvensButton.addEventListener('click', () => {
      this.buyUpgrade('fasterOvens');
      this.playButtonClickSound();
    });

    const blastOvensButton = document.getElementById('blastOvensButton');
    blastOvensButton.addEventListener('click', () => {
      this.buyUpgrade('blastOvens');
      this.playButtonClickSound();
    });

    const pieButton = document.getElementById('pieButton');
    pieButton.addEventListener('click', () => {
      this.changeImageSize();
      this.playPieClickSound();
    });

    const pieImage = document.getElementById('pieImage');
    pieImage.addEventListener('click', this.addPieOnClick);

    const startMusicButton = document.getElementById('startMusicButton');
    startMusicButton.addEventListener('click', this.startMusic);

    setInterval(this.generatePies, 1000);
  }
  startMusic() {
    this.playBackgroundMusic();
    document.getElementById('startMusicButton').disabled = true;

  }

  playBackgroundMusic() {
    const audio = new Audio("/assets/images/piemusic.mp3");
    audio.loop = true;
    audio.play();
  }

  playButtonClickSound() {
    const audio = new Audio("/assets/images/click.mp3");
    audio.play();
  }

  playPieClickSound() {
    const audio = new Audio("/assets/images/pie.mp3");
    audio.play();
  }

  buyUpgrade(upgradeType) {
    const cost = this.upgradeCosts[upgradeType];
    const pieRate = this.getUpgradePieRate(upgradeType);

    if (this.pieCount >= cost) {
      this[upgradeType + 'Count']++;
      this.pieCount -= cost;
      document.getElementById(upgradeType + 'Counter').innerText = this[upgradeType + 'Count'];

      // Increase the upgrade cost for the next purchase (compounding on the new price)
      this.upgradeCosts[upgradeType] = Math.floor(cost * 1.05);

      // Update pie generation rate
      this.pieGenerationRate = this.whiteMomsCount * 1 + this.fasterOvensCount * 10 + this.blastOvensCount * 50;
    } else {
      toastr.warning('Insufficient pies to buy the upgrade.');
    }

    document.getElementById('piesNumber').innerText = this.pieCount;
    document.getElementById('whiteMomsCost').innerText = this.upgradeCosts.whiteMoms;
    document.getElementById('fasterOvensCost').innerText = this.upgradeCosts.fasterOvens;
    document.getElementById('blastOvensCost').innerText = this.upgradeCosts.blastOvens;
  }

  getUpgradePieRate(upgradeType) {
    if (upgradeType === 'whiteMoms') {
      return 1;
    } else if (upgradeType === 'fasterOvens') {
      return 10;
    } else if (upgradeType === 'blastOvens') {
      return 50;
    }
    return 0;
  }

  changeImageSize() {
    const pieImage = document.getElementById('pieImage');
    pieImage.style.transition = 'width 0.05s'; // Add transition for smooth resizing
    pieImage.style.width = '700px';

    setTimeout(() => {
      pieImage.style.width = ''; // Reset width to auto
    }, 100);
  }

  generatePies() {
    if (this.pieGenerationRate > 0) {
      this.pieCount += this.pieGenerationRate;
      document.getElementById('piesNumber').innerText = this.pieCount;
    }
  }

  addPieOnClick() {
    this.pieCount++;
    document.getElementById('piesNumber').innerText = this.pieCount;
  }
}

const pie = new Pie();
window.pie = pie;