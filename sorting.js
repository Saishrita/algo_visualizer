class SortingVisualizer {
  constructor() {
    this.array = [];
    this.arrayContainer = document.getElementById('array-container');
    this.comparisons = 0;
    this.swaps = 0;
    this.isRunning = false;
    this.delay = 50;

    this.resetArray();
    this.setupEventListeners();
  }

  resetArray() {
    this.array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
    this.comparisons = 0;
    this.swaps = 0;
    this.updateStats();
    this.render();
  }

  setupEventListeners() {
    document.getElementById('reset-array').addEventListener('click', () => this.resetArray());
    document.getElementById('start-sorting').addEventListener('click', () => this.startSorting());
  }

  async startSorting() {
    if (this.isRunning) return;
    this.isRunning = true;

    const algorithm = document.querySelector('#sorting-card .algo-btn.active').dataset.algo;
    const startButton = document.getElementById('start-sorting');
    startButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
      Pause
    `;

    switch (algorithm) {
      case 'bubble':
        await this.bubbleSort();
        break;
      case 'selection':
        await this.selectionSort();
        break;
      case 'insertion':
        await this.insertionSort();
        break;
      case 'merge':
        await this.mergeSort();
        break;
      case 'quick':
        await this.quickSort();
        break;
    }

    this.isRunning = false;
    startButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      Start
    `;
  }

  updateStats() {
    document.getElementById('comparisons').textContent = this.comparisons;
    document.getElementById('swaps').textContent = this.swaps;
  }

  render() {
    this.arrayContainer.innerHTML = '';
    const max = Math.max(...this.array);
    
    this.array.forEach(value => {
      const bar = document.createElement('div');
      bar.className = 'array-bar';
      bar.style.height = `${(value / max) * 100}%`;
      this.arrayContainer.appendChild(bar);
    });
  }

  async swap(i, j) {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.swaps++;
    this.updateStats();
    this.render();
    await new Promise(resolve => setTimeout(resolve, this.delay));
  }

  async compare(i, j) {
    this.comparisons++;
    this.updateStats();
    return this.array[i] > this.array[j];
  }

  // Sorting Algorithms
  async bubbleSort() {
    const n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (await this.compare(j, j + 1)) {
          await this.swap(j, j + 1);
        }
      }
    }
  }

  async selectionSort() {
    const n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (await this.compare(minIdx, j)) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        await this.swap(i, minIdx);
      }
    }
  }

  async insertionSort() {
    const n = this.array.length;
    for (let i = 1; i < n; i++) {
      let key = this.array[i];
      let j = i - 1;
      while (j >= 0 && await this.compare(j, j + 1)) {
        await this.swap(j, j + 1);
        j--;
      }
    }
  }

  async mergeSort(left = 0, right = this.array.length - 1) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await this.mergeSort(left, mid);
    await this.mergeSort(mid + 1, right);
    await this.merge(left, mid, right);
  }

  async merge(left, mid, right) {
    const temp = [];
    let i = left;
    let j = mid + 1;
    
    while (i <= mid && j <= right) {
      if (await this.compare(i, j)) {
        temp.push(this.array[j++]);
      } else {
        temp.push(this.array[i++]);
      }
    }
    
    while (i <= mid) temp.push(this.array[i++]);
    while (j <= right) temp.push(this.array[j++]);
    
    for (let k = 0; k < temp.length; k++) {
      this.array[left + k] = temp[k];
      this.render();
      await new Promise(resolve => setTimeout(resolve, this.delay));
    }
  }

  async quickSort(left = 0, right = this.array.length - 1) {
    if (left >= right) return;
    
    const pivot = await this.partition(left, right);
    await this.quickSort(left, pivot - 1);
    await this.quickSort(pivot + 1, right);
  }

  async partition(left, right) {
    const pivot = this.array[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
      if (this.array[j] <= pivot) {
        i++;
        await this.swap(i, j);
      }
    }
    
    await this.swap(i + 1, right);
    return i + 1;
  }
}

// Initialize sorting visualizer
const sortingVisualizer = new SortingVisualizer();