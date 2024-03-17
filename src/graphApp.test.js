/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const userEvent = require("@testing-library/user-event").default
const { userInfo } = require("os")
require('@testing-library/jest-dom')

//Saved data between refreshes
const InputStorage = require(`${__dirname}/lib/chartStorage`)

function initDomFromFIles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    require(jsPath)
    
}


beforeEach(() => {
 
    currentChartData = {}
    InputStorage.updateCurrentChartData(currentChartData)

    jest.resetModules()
})

//Adding values in the chart builder tests
test("Clicking the + button adds an X and Y input correctly", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
	
	// Acquire the + button
	const addCoordInputBtn = domTesting.getByText(document, "+")

    //Acquire X and Y values
    const XVal = domTesting.getByLabelText(document, "X")
    const YVal = domTesting.getByLabelText(document, "Y")
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(XVal, "5")
    await user.type(YVal, "10")
	await user.click(addCoordInputBtn)
    await user.click(addCoordInputBtn)
    await user.click(addCoordInputBtn)

	// Assert:
    CheckXInputs = domTesting.queryAllByText(document,"X")
    CheckYInputs = domTesting.queryAllByText(document,"Y")

	// Checks that 2 new inputs are added
    expect(CheckXInputs).toHaveLength(4)
    expect(CheckYInputs).toHaveLength(4)
    expect(XVal).toHaveValue(5)
    expect(YVal).toHaveValue(10)
})

//Alerts displayed for missing chart data tests
test("Genereating a graph without any values", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
    window.alert = jest.fn()
	// Acquire the + button
	const GeneratechartBtn = domTesting.getByText(document, "Generate chart")

    //Alert message
    const errorMessage = "Error: No data specified!"
    
    //Create spy
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
	// Act:
	const user = userEvent.setup()
    
	await user.click(GeneratechartBtn)

	// Assert:
    expect(spy).toHaveBeenCalledTimes(1);

    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    
    spy.mockRestore()

})

test("Genereating a graph without X/Y axis titles", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
    window.alert = jest.fn()
	// Acquire the + button
	const GeneratechartBtn = domTesting.getByText(document, "Generate chart")

    //Acquire X and Y values
    const X_Val = domTesting.queryAllByLabelText(document, "X")
    const Y_Val = domTesting.queryAllByLabelText(document, "Y")

    //Alert message
    const errorMessage = "Error: Must specify a label for both X and Y!"
    
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(X_Val[0], "1")
    await user.type(Y_Val[0], "2")
	await user.click(GeneratechartBtn)

	// Assert:
    expect(spy).toHaveBeenCalledTimes(1);
    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    
    spy.mockRestore()

})

test("Genereating a graph without X/Y points", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)
    window.alert = jest.fn()
	// Acquire the + button
	const GeneratechartBtn = domTesting.getByText(document, "Generate chart")

    //Acquire X and Y values
    const X_Axis = domTesting.getByLabelText(document, "X label")
    const Y_Axis = domTesting.getByLabelText(document, "Y label")

    //Alert message
    const errorMessage = "Error: No data specified!"
    
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
	// Act:
	const user = userEvent.setup()
    
    await user.type(X_Axis, "X Axis")
    await user.type(Y_Axis, "Y Axis")
	await user.click(GeneratechartBtn)

	// Assert:
    expect(spy).toHaveBeenCalledTimes(1);
    const alertMessage = alert.mock.lastCall[0]
    expect(alertMessage).toEqual(errorMessage)

    
    spy.mockRestore()

})


//Clearing chart data tests
describe("Clearing the data button correctly resets data", function (){

test("Clearing the data button resets Chart title", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)

    //Acquire Chart title
    const Chart_title_input = domTesting.getByLabelText(document, "Chart title")

    //Acquire Chart title
    const Clear_chart_data_btn = domTesting.getByRole(document, "button", {name : "Clear chart data"})
	// Act:
	const user = userEvent.setup()
    await user.type(Chart_title_input, "Test title")
	await user.click(Clear_chart_data_btn)

	// Assert:
    expect(Chart_title_input).toHaveValue("")

})

test("Clearing the data button resets X/Y axis titles", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)

    //Acquire Chart title
    const Clear_chart_data_btn = domTesting.getByRole(document, "button", {name : "Clear chart data"})

    //Acquire Chart title
    const X_Axis_title = domTesting.getByLabelText(document, "X label")
    const Y_Axis_title = domTesting.getByLabelText(document, "Y label")

	// Act:
	const user = userEvent.setup()
    await user.type(X_Axis_title, "X axis title")
    await user.type(Y_Axis_title, "Y axis title")

	await user.click(Clear_chart_data_btn)

	// Assert:
    expect(X_Axis_title).toHaveValue("")
    expect(Y_Axis_title).toHaveValue("")

})

test("Clearing the data button resets X/Y point values", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)

    //Acquire Chart title
    const Clear_chart_data_btn = domTesting.getByRole(document, "button", {name : "Clear chart data"})
    const add_Point_btn = domTesting.getByRole(document, "button", {name : "+"})


    //Acquire Chart title

	// Act:
	const user = userEvent.setup()

    await user.click(add_Point_btn)
    await user.click(add_Point_btn)

    const X_points = domTesting.queryAllByLabelText(document, "X")
    const Y_points = domTesting.queryAllByLabelText(document, "Y")

    await user.type(X_points[0], "1")
    await user.type(Y_points[0], "2")
    await user.type(X_points[1], "3")
    await user.type(Y_points[1], "4")
    await user.type(X_points[2], "5")
    await user.type(Y_points[2], "6")

	await user.click(Clear_chart_data_btn)

	// Assert:
    const newX_points = domTesting.queryAllByLabelText(document, "X")
    const newY_points = domTesting.queryAllByLabelText(document, "Y")

    expect(newX_points).toHaveLength(1)
    expect(newY_points).toHaveLength(1)
    
    expect(newX_points[0]).not.toHaveValue()
    expect(newY_points[0]).not.toHaveValue()

})

test("Clearing the data button resets color picker", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)

    //Acquire Chart title
    const Clear_chart_data_btn = domTesting.getByRole(document, "button", {name : "Clear chart data"})
    const Chart_color_btn = domTesting.getByLabelText(document, "Chart color")

    //Acquire Chart title
    domTesting.fireEvent.input(Chart_color_btn, {target: {value: '#00ff4C'}})

	// Act:
	const user = userEvent.setup()
	await user.click(Clear_chart_data_btn)
    await user.click(Chart_color_btn)
    await user.click(Chart_color_btn)
	// Assert:
    expect(Chart_color_btn).toHaveValue("#ff4500")

})

})

test("Sending correct values to generate graph function", async function() {
	// Arrange:
	initDomFromFIles(`${__dirname}/line/line.html`, `${__dirname}/line/line.js`)

    const generateChartImg = require("./lib/generateChartImg.js")
    jest.mock('./lib/generateChartImg.js');
    generateChartImg.mockImplementation((type, data, xLabel, yLabel, title, color) => {})
    
    //Aquire buttons/inputs
    const Chart_color_btn = domTesting.getByLabelText(document, "Chart color")
    const generateChartButton = domTesting.getByRole(document, "button", {name : "Generate chart"})
    const add_Point_btn = domTesting.getByRole(document, "button", {name : "+"})
    const Chart_title_input = domTesting.getByLabelText(document, "Chart title")

    const X_Axis_title = domTesting.getByLabelText(document, "X label")
    const Y_Axis_title = domTesting.getByLabelText(document, "Y label")

    // Create more points
	const user = userEvent.setup()
	await user.click(add_Point_btn)
    await user.click(add_Point_btn)

    //Get points inputs
    const X_points = domTesting.queryAllByLabelText(document, "X")
    const Y_points = domTesting.queryAllByLabelText(document, "Y")

    //Create fake inputs
    domTesting.fireEvent.input(Chart_color_btn, {target: {value: '#00ff4C'}})

    await user.type(Chart_title_input, "Test title")
    await user.type(X_Axis_title, "X axis title")
    await user.type(Y_Axis_title, "Y axis title")

    await user.type(X_points[0], "1")
    await user.type(Y_points[0], "2")
    await user.type(X_points[1], "3")
    await user.type(Y_points[1], "4")
    await user.type(X_points[2], "5")
    await user.type(Y_points[2], "6")

    await user.click(generateChartButton)

    //Make generate chart went through
    expect(generateChartImg).toHaveBeenCalledTimes(1)
    expect(generateChartImg).toHaveBeenCalledWith
    (
        "line",
         [{"x": "1", "y": "2"},{"x": "3", "y": "4"},{"x": "5", "y": "6"}], 
          "X axis title",
          "Y axis title",
          "Test title",
          "#00ff4c"
    )

})