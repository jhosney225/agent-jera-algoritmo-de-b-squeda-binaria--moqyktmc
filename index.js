```javascript
const readline = require('readline');

// Clase para la visualización del algoritmo de búsqueda binaria
class BinarySearchVisualizer {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Algoritmo de búsqueda binaria con registro de pasos
  binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let steps = [];
    let iterations = 0;

    console.log('\n' + '='.repeat(60));
    console.log('INICIANDO BÚSQUEDA BINARIA');
    console.log('='.repeat(60));
    console.log(`Array: [${arr.join(', ')}]`);
    console.log(`Buscando: ${target}`);
    console.log('='.repeat(60) + '\n');

    while (left <= right) {
      iterations++;
      const mid = Math.floor((left + right) / 2);
      const midValue = arr[mid];

      // Crear visualización del estado actual
      const visualization = this.visualizeArray(arr, left, right, mid);
      
      steps.push({
        iteration: iterations,
        left,
        right,
        mid,
        midValue,
        visualization
      });

      console.log(`Iteración ${iterations}:`);
      console.log(visualization);
      console.log(`  Left: ${left}, Right: ${right}, Mid: ${mid}`);
      console.log(`  Valor en posición ${mid}: ${midValue}`);

      if (midValue === target) {
        console.log(`\n✓ ¡ENCONTRADO! El valor ${target} está en la posición ${mid}`);
        console.log(`Total de iteraciones: ${iterations}\n`);
        return { found: true, position: mid, iterations, steps };
      } else if (midValue < target) {
        console.log(`  ${midValue} < ${target}, buscar en la derecha\n`);
        left = mid + 1;
      } else {
        console.log(`  ${midValue} > ${target}, buscar en la izquierda\n`);
        right = mid - 1;
      }
    }

    console.log(`\n✗ No encontrado. El valor ${target} no existe en el array`);
    console.log(`Total de iteraciones: ${iterations}\n`);
    return { found: false, position: -1, iterations, steps };
  }

  // Visualizar el array con los índices actuales resaltados
  visualizeArray(arr, left, right, mid) {
    let visual = '  [';
    
    for (let i = 0; i < arr.length; i++) {
      if (i === mid) {
        visual += `\x1b[42m\x1b[30m${arr[i]}\x1b[0m`;
      } else if (i >= left && i <= right) {
        visual += `\x1b[44m\x1b[37m${arr[i]}\x1b[0m`;
      } else {
        visual += `\x1b[90m${arr[i]}\x1b[0m`;
      }
      
      if (i < arr.length - 1) visual += ', ';
    }
    
    visual += ']';
    console.log(visual);
    console.log('  \x1b[42m\x1b[30m  MID (actual)\x1b[0m  \x1b[44m\x1b[37m  Rango de búsqueda\x1b[0m  \x1b[90m  Excluido\x1b[0m');
    
    return visual;
  }

  // Generar un array ordenado aleatorio
  generateSortedArray(size = 20) {
    const arr = [];
    let current = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < size; i++) {
      current += Math.floor(Math.random() * 5) + 1;
      arr.push(current);
    }
    
    return arr;
  }

  // Modo demostración automática
  async demonstrationMode() {
    console.clear();
    console.log('\n╔══════════════════════════════════════════════════════╗');
    console.log('║     ALGORITMO DE BÚSQUEDA BINARIA - DEMOSTRACIÓN     ║');
    console.log('╚══════════════════════════════════════════════════════╝\n');

    const testCases = [
      { arr: [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78], target: 23 },
      { arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], target: 13 },
      { arr: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], target: 35 },
      { arr: this.generateSortedArray(15), target: null }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      if (testCase.target === null) {
        testCase.target = testCase.arr[Math.floor(Math.random() * testCase.arr.length)];
      }

      const result = this.binarySearch(testCase.arr, testCase.target);
      
      this.printStatistics(result);

      if (i < testCases.length - 1) {
        await this.pause(3000);
        console.clear();
      }
    }

    this.showComplexityAnalysis();
    this.rl.close();
  }

  