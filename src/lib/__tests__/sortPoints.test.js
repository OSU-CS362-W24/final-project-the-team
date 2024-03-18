const sortPoints = require('../sortPoints');


//const result = sortPoints()


test('works correctly with single point', () => {
    // Define input data (single point)
    const points = [{ x: 5, y: 10 }];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([{ x: 5, y: 10 }]);
  });


  test('works correctly with an empty array', () => {
    // Define input data (single point)
    const points = [{ }];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([{ }]);
  });

  describe('sortPoints function', () => {
    test('throws error if not given an array', () => {
      // Define input data (not an array)
      const points = 2;
  
      // Wrap the function call in a function to test for error
      const sortNonArray = () => {
        sortPoints(points);
      };
  
      // Check if calling sortNonArray throws an error
      expect(sortNonArray).toThrow(TypeError);
    });
  });


  test('works correctly with already sorted array', () => {
    // Define input data (already sorted array)
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ]);
  });


  test('works correctly with an unsorted array', () => {
    // Define input data (already sorted array)
    const points = [
      { x: 3, y: 4 },
      { x: 7, y: 12 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      
    ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 7, y: 12 },
    ]);
  });



  test('works correctly when a null value is inserted', () => {
    // Define input data (already sorted array)
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: null },
      { x: 3, y: 4 },
    ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: null },
      { x: 3, y: 4 },
    ]);
  });


  test('works correctly with an entirely null array', () => {
    // Define input data (already sorted array)
    const points = [
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
      { x: null, y: null },
      { x: null, y: null },
      { x: null, y: null },
    ]);
  });



   test('works correctly with negative values', () => {
    // Define input data (already sorted array)
    const points = [
      { x: 3, y: 4 },
      { x: -6, y: -3 },
      { x: 2, y: 3 },
          ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
        { x: -6, y: -3 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
      ]);

  });


  describe('sortPoints function', () => {
    test('works correctly with large values', () => {
      // Define input data (unsorted array)
      const points = [
        { x: 3, y: 4 },
        { x: -6, y: -3 },
        { x: 99999, y: 9999999 },
      ];
  
      // Call the sortPoints function
      sortPoints(points);
  
      // Check if the points array is correctly sorted
      expect(points).toEqual([
        { x: -6, y: -3 },
        { x: 3, y: 4 },
        { x: 99999, y: 9999999 },
      ]);
    });
  });



  test('works correctly with decimal values', () => {
    // Define input data (already sorted array)
    const points = [
      { x: 3.62, y: 4.88 },
      { X: 3, y: 4 },
      { x: -6, y: -3 },
      { x: 2, y: 3 },
          ];

    // Call the sortPoints function
    sortPoints(points);

    // Check if the points array remains unchanged
    expect(points).toEqual([
        { x: 3.62, y: 4.88 },
        { X: 3, y: 4 },
        { x: -6, y: -3 },
        { x: 2, y: 3 },
            ]);

  });


 


