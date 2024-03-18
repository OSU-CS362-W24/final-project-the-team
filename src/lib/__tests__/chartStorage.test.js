const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
} = require('../chartStorage');





// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: key => store[key] || null,
        setItem: (key, value) => store[key] = value.toString(),
        clear: () => store = {}
    };
})();
global.localStorage = localStorageMock;

// Mock window object
global.window = {
    localStorage: localStorageMock
};



describe('saveChart function', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('adds a new chart to localStorage', () => {
        // Define a mock chart
        const chart = { data: [1, 2, 3], title: 'Test Chart' };

        // Call saveChart function
        saveChart(chart);

        // Retrieve saved charts from localStorage
        const savedCharts = loadAllSavedCharts();

        // Expect the chart to be saved correctly
        expect(savedCharts).toHaveLength(1);
        expect(savedCharts[0]).toEqual(chart);
    });

 
});


describe('loadCurrentChartData function', () => {
    test('returns current chart data from localStorage', () => {
        // Define mock current chart data
        const currentChartData = { data: [4, 5, 6], title: 'New Chart' };

        // Store mock current chart data in localStorage
        window.localStorage.setItem('currentChartData', JSON.stringify(currentChartData));

        // Call loadCurrentChartData function
        const loadedData = loadCurrentChartData();

        // Expect the current chart data to be loaded correctly
        expect(loadedData).toEqual(currentChartData);
    });

});


test('updates the current chart data in localStorage without changing the length', () => {
    // Define mock current chart data
    const initialChartData = { data: [1, 2, 3], title: 'Initial Chart' };
    const updatedChartData = { data: [4, 5, 6], title: 'Updated Chart' };

    // Save initial chart data
    updateCurrentChartData(initialChartData);

    // Get the length of saved charts before updating
    const initialChartsLength = loadAllSavedCharts().length;

    // Call updateCurrentChartData function to update the chart data
    updateCurrentChartData(updatedChartData);

    // Retrieve current chart data from localStorage
    const loadedData = loadCurrentChartData();

    // Get the length of saved charts after updating
    const updatedChartsLength = loadAllSavedCharts().length;

    // Expect the current chart data to be updated correctly
    expect(loadedData).toEqual(updatedChartData);

    // Expect the length of saved charts to remain unchanged
    expect(updatedChartsLength).toEqual(initialChartsLength);
});


test('returns a specific chart from localStorage', () => {
    // Clear localStorage before the test to ensure it's empty
    window.localStorage.clear();

    // Define mock charts
    const chart1 = { data: [1, 2, 3], title: 'Chart 1' };
    const chart2 = { data: [4, 5, 6], title: 'Chart 2' };

    // Save charts to localStorage
    saveChart(chart1);
    saveChart(chart2);

    // Call loadSavedChart function to load the second chart
    const loadedChart = loadSavedChart(1);

    // Expect the second chart to be loaded correctly
    expect(loadedChart).toEqual(chart2);
});


test('returns an empty object if the chart index is out of bounds', () => {
    // Clear localStorage before the test to ensure it's empty
    window.localStorage.clear();

    // Define mock charts
    const chart1 = { data: [1, 2, 3], title: 'Chart 1' };

    // Save a chart to localStorage
    saveChart(chart1);

    // Call loadSavedChart function with an out-of-bounds index
    const loadedChart = loadSavedChart(1); // Index 1 is out of bounds for this test

    // Expect an empty object to be returned
    expect(loadedChart).toEqual({});
});


test('returns an empty object if localStorage is empty', () => {
    // Clear localStorage before the test to ensure it's empty
    window.localStorage.clear();

    // Call loadSavedChart function when localStorage is empty
    const loadedChart = loadSavedChart(0); // Index doesn't matter for this test

    // Expect an empty object to be returned
    expect(loadedChart).toEqual({});
});



