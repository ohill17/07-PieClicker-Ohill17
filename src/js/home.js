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


    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', () => {
      this.saveGameData()

    });

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

    this.initLoginForm();
  }

  startMusic() {
    this.playBackgroundMusic();
    document.getElementById('startMusicButton').disabled = true;
  }

  playBackgroundMusic() {
    const audio = new Audio('/assets/images/piemusic.mp3');
    audio.loop = true;
    audio.play();
  }

  playButtonClickSound() {
    const audio = new Audio('/assets/images/click.mp3');
    audio.play();
  }

  playPieClickSound() {
    const audio = new Audio('/assets/images/pie.mp3');
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
  async login(username, password) {
    let SERVER_URL = "http://localhost:3000/participants";


    try {
      const response = await fetch(SERVER_URL);
      if (response.ok) {
        const data = await response.json();
        const user = data.find(user => user.username === username && user.password === password);
        if (user) {
          this.resetUpgrades();
          this.resetTotalPies();
          this.resetGeneratePieRate();

          this.updateData(user.gameData);
          toastr.success('Login successful!');
        } else {
          toastr.error('Invalid username or password.');
        }
      } else {
        toastr.error('Failed to fetch user data.');
      }
    } catch (error) {
      toastr.error('An error occurred during login.');
      console.error(error);
    }
  }

  resetUpgrades() {
    this.whiteMomsCount = 0;
    this.fasterOvensCount = 0;
    this.blastOvensCount = 0;

    // Update the DOM elements with reset upgrade counts
    document.getElementById('whiteMomsCounter').innerText = this.whiteMomsCount;
    document.getElementById('fasterOvensCounter').innerText = this.fasterOvensCount;
    document.getElementById('blastOvensCounter').innerText = this.blastOvensCount;
  }
  resetGeneratePieRate() {
    this.pieGenerationRate = 0;
  }

  resetTotalPies() {
    this.pieCount = 0;

    // Update the DOM element with reset total pies count
    document.getElementById('piesNumber').innerText = this.pieCount;
  }
  initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const username = usernameInput.value;
      const password = passwordInput.value;
      pie.login(username, password);

      // Clear login fields
      usernameInput.value = '';
      passwordInput.value = '';
    });
  }
  updateData(gameData) {
    console.log(gameData);
    if (gameData && typeof gameData === 'object') {
      this.pieCount = gameData.totalPies || 0;
      this.generatePies();
      // Check if the gameData has valid upgrades data
      if (gameData.upgrades && typeof gameData.upgrades === 'object') {
        this.whiteMomsCount = gameData.upgrades.whiteMoms?.count || 0;
        this.fasterOvensCount = gameData.upgrades.fasterOvens?.count || 0;
        this.blastOvensCount = gameData.upgrades.blastOvens?.count || 0;
      }

      // Update the DOM elements with the updated data
      document.getElementById('whiteMomsCounter').innerText = this.whiteMomsCount;
      document.getElementById('fasterOvensCounter').innerText = this.fasterOvensCount;
      document.getElementById('blastOvensCounter').innerText = this.blastOvensCount;
      document.getElementById('piesNumber').innerText = this.pieCount;
      document.getElementById('whiteMomsCost').innerText = gameData.upgrades?.whiteMoms?.cost || 0;
      document.getElementById('fasterOvensCost').innerText = gameData.upgrades?.fasterOvens?.cost || 0;
      document.getElementById('blastOvensCost').innerText = gameData.upgrades?.blastOvens?.cost || 0;
    } else {
      // Handle the case where gameData is undefined or has an unexpected structure
      toastr.error('Invalid game data received.');
    }
  }
  async getCurrentUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      let SERVER_URL = "http://localhost:3000/participants";
      let url = SERVER_URL;

      if (username && password) {
        url += `?username=${username}&password=${password}`;
      }

      const response = await fetch(url);
      const users = await response.json();

      if (users.length > 0) {
        return users[0]; // Assuming there is only one user with the given username and password
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  }

  async saveGameData() {
    const currentUser = await this.getCurrentUser();

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        gameData: {
          totalPies: this.pieCount,
          upgrades: {
            whiteMoms: {
              count: this.whiteMomsCount,
              cost: this.upgradeCosts.whiteMoms,
            },
            fasterOvens: {
              count: this.fasterOvensCount,
              cost: this.upgradeCosts.fasterOvens,
            },
            blastOvens: {
              count: this.blastOvensCount,
              cost: this.upgradeCosts.blastOvens,
            },
          },
        },
      };

      let SERVER_URL = "http://localhost:3000/participants";
      try {
        const response = await fetch(`${SERVER_URL}/${currentUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
          toastr.success('Game data saved successfully!');
        } else {
          toastr.error('Failed to save game data.');
        }
      } catch (error) {
        toastr.error('An error occurred while saving game data.');
        console.error(error);
      }
    } else {
      toastr.error('No current user found.');
    }
  }
}
const pie = new Pie();
window.pie = pie;