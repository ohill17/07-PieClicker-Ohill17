import './general';
const regeneratorRuntime = require("regenerator-runtime");
import { Chart, registerables } from 'chart.js';

class Status {
  constructor() {
    Chart.register(...registerables);
    this.$experienceTab = document.querySelector('#experienceTab');
    this.$professionTab = document.querySelector('#professionTab');
    this.$professionCanvas = document.querySelector('#professionChart');
    this.$experienceCanvas = document.querySelector('#experienceChart');
    this.$loadingIndicator = document.querySelector('#loadingIndicator');
    this.$tabArea = document.querySelector('#tabArea');
    this.$chartArea = document.querySelector('#chartArea');
    this.$errorMessage = document.querySelector('#errorMessage');

    this.allData;
    this.professionData;
    this.experienceData;

    this.loadData();
    this.addEventListeners();
  }

  groupData(data, property) {
    return data.map(val => val[property])
      .reduce((acc, val, i) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
  }

  loadData() {
    fetch("http://localhost:3000/participants")
      .then(response => response.json())
      .then(data => {
        this.allData = data;
        this.experienceData = this.groupData(this.allData, "experience");
        this.professionData = this.groupData(this.allData, "profession");

        this.$loadingIndicator.classList.add('visually-hidden');
        this.$tabArea.classList.remove('visually-hidden');
        this.$chartArea.classList.remove('visually-hidden');

        this.loadExperience();
        this.loadProfession();
      })
      .catch(error => {
        console.log(error);
        alert("Oopsie poopsie :C");
        this.$loadingIndicator.classList.add('visually-hidden');
        // this.$errorMessage.classList.remove('visually-hidden');
      });
  }

  addEventListeners() {
    this.$experienceTab.addEventListener('click', this.loadExperience.bind(this));
    this.$professionTab.addEventListener('click', this.loadProfession.bind(this));
  }

  hideCharts() {
    this.$experienceTab.classList.remove('active');
    this.$professionTab.classList.remove('active');
    this.$professionCanvas.classList.add('visually-hidden');
    this.$experienceCanvas.classList.add('visually-hidden');
  }

  loadExperience(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$experienceCanvas.classList.remove('visually-hidden');
    this.$experienceTab.classList.add('active');

    // Check if a Chart instance already exists for the canvas
    const existingChart = Chart.getChart(this.$experienceCanvas);
    if (existingChart) {
      existingChart.destroy(); // Destroy the existing Chart instance
    }

    const chartData = {
      datasets: [{
        data: [
          this.experienceData.beginner || 0,
          this.experienceData.intermediate || 0,
          this.experienceData.advanced || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'white',
          'white',
          'white',
        ],
        borderWidth: 1
      }],
      labels: [
        'Beginner',
        'Intermediate',
        'Advanced'
      ]
    };

     try {
      new Chart(this.$experienceCanvas, {
        type: 'pie',
        data: chartData,
        options: {}
      });
    }
    catch {}
  }
  loadProfession(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$professionCanvas.classList.remove('visually-hidden');
    this.$professionTab.classList.add('active');

    const chartData = {
      datasets: [{
        data: [
          this.professionData.school || 0,
          this.professionData.college || 0,
          this.professionData.trainee || 0,
          this.professionData.employee || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'white',
          'white',
          'white',
          'white'
        ],
        borderWidth: 1
      }],
      labels: [
        'School Students',
        'College Students',
        'Trainees',
        'Employees'
      ]
    };

    new Chart(this.$professionCanvas, {
      type: 'pie',
      data: chartData,
      options: {}
    });
  }
}

window.onload = () => {
  new Status();
};