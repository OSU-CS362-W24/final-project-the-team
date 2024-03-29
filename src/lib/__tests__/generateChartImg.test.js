const generateChartImg = require('../generateChartImg');

describe('generateChartImg function', () => {
  test('returns a URL representing the chart image', async () => {
    // Define input parameters
    const type = 'line';
    const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }];
    const xLabel = 'X Axis';
    const yLabel = 'Y Axis';
    const title = 'Chart Title';
    const color = 'blue';

    // Call the generateChartImg function
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);

    // Check if the function returns a URL representing the chart image /^blob is part of the URL that is returned from the API
    expect(imgUrl).toMatch(/^blob:/);
  });
});

describe('generateChartImg function', () => {
    test('returns a URL representing the chart image bar graph', async () => {
      // Define input parameters
      const type = 'bar';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Chart Title';
      const color = 'blue';
  
      // Call the generateChartImg function
      const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
  
      // Check if the function returns a URL representing the chart image /^blob is part of the URL that is returned from the API
      expect(imgUrl).toMatch(/^blob:/);
    });
  });





describe('generateChartImg function', () => {
    test('returns a URL representing the chart image with a bigger dataset', async () => {
      // Define input parameters
      const type = 'line';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 7, y: 3 }, { x: 8, y: 9 }, { x: 27, y: 1 }, { x: 52, y: 50 }, { x: 3, y: 22 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Chart Title';
      const color = 'blue';
  
      // Call the generateChartImg function
      const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
  
      // Check if the function returns a URL representing the chart image /^blob is part of the URL that is returned from the API
      expect(imgUrl).toMatch(/^blob:/);
    });
  });


describe('generateChartImg function', () => {
    test('still makes request even if color is invalid', async () => {
      // Define input parameters with an invalid color
      const type = 'line';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Chart Title';
      const color = 29; // Invalid color
        
      //call generate chart function
      const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);

  
      //assert for API call
      expect(imgUrl).toMatch(/^blob:/);
    });
  });


  describe('generateChartImg function', () => {
    test('returns a valid URL representing the chart image', async () => {
      // Define input parameters
      const type = 'line';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Chart Title';
      const color = 'blue';
  
      // Call the generateChartImg function
      const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
  
      
      const parsedUrl = new URL(imgUrl);
  
      // Assert that a API is called correctly
      expect(parsedUrl).toBeDefined();
    });
  });



  describe('generateChartImg function', () => {
    test('returns a valid URL representing the chart image when color is not inputted', async () => {
      // Define input parameters
      const type = 'line';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Chart Title';
      
  
      // Call the generateChartImg function
      const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title);
  
      
      const parsedUrl = new URL(imgUrl);
  
      // Assert that a proper URL is returned
      expect(parsedUrl).toBeDefined();
    });
  });


  test('throws an error when the QuickChart API request fails', async () => {
    // Call the generateChartImg function with invalid parameters
    const invalidType = 'invalid'; // Invalid type
    const invalidData = 'invalid'; // Invalid data
    const xLabel = 'X Axis';
    const yLabel = 'Y Axis';
    const title = 'Chart Title';
    const color = 'blue';

    // Call the generateChartImg function and expect it to throw an error
    await expect(generateChartImg(invalidType, invalidData, xLabel, yLabel, title, color)).rejects.toThrow();
});


  
  
  

